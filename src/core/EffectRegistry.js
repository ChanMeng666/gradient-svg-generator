/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Effect Registry - Central registry for all SVG effect types
 *
 * This class provides a unified interface for registering, discovering,
 * and accessing all available SVG effects in the system.
 *
 * @class EffectRegistry
 */
class EffectRegistry {
  constructor() {
    /**
     * Map of effect name to effect metadata
     * @type {Map<string, EffectMetadata>}
     */
    this.effects = new Map();

    /**
     * Map of category name to array of effect names
     * @type {Map<string, string[]>}
     */
    this.categories = new Map();

    /**
     * Map of template name to effect name
     * @type {Map<string, string>}
     */
    this.templateMappings = new Map();
  }

  /**
   * Register a new effect in the registry
   *
   * @param {EffectMetadata} metadata - Effect metadata object
   * @param {string} metadata.name - Unique effect identifier
   * @param {string} metadata.category - Effect category (basic, artistic, futureTech, etc.)
   * @param {Function} metadata.generator - Generator function
   * @param {string} metadata.outputType - Output type: 'complete' | 'fragment' | 'gradient'
   * @param {string[]} [metadata.filters=[]] - Required SVG filters
   * @param {string} [metadata.description=''] - Human-readable description
   * @param {string[]} [metadata.templates=[]] - Associated template names
   * @param {string[]} [metadata.aliases=[]] - Alternative names for this effect
   * @throws {Error} If effect name already exists or metadata is invalid
   */
  register(metadata) {
    // Validate required fields
    if (!metadata.name || typeof metadata.name !== 'string') {
      throw new Error('Effect name is required and must be a string');
    }

    if (!metadata.category || typeof metadata.category !== 'string') {
      throw new Error('Effect category is required and must be a string');
    }

    if (!metadata.generator || typeof metadata.generator !== 'function') {
      throw new Error('Effect generator is required and must be a function');
    }

    if (!metadata.outputType || !['complete', 'fragment', 'gradient'].includes(metadata.outputType)) {
      throw new Error('Effect outputType must be one of: complete, fragment, gradient');
    }

    // Check for duplicate effect names
    if (this.effects.has(metadata.name)) {
      throw new Error(`Effect '${metadata.name}' is already registered`);
    }

    // Normalize metadata
    const normalizedMetadata = {
      name: metadata.name,
      category: metadata.category,
      generator: metadata.generator,
      outputType: metadata.outputType,
      filters: metadata.filters || [],
      description: metadata.description || '',
      templates: metadata.templates || [],
      aliases: metadata.aliases || []
    };

    // Register the effect
    this.effects.set(metadata.name, normalizedMetadata);

    // Register category
    if (!this.categories.has(metadata.category)) {
      this.categories.set(metadata.category, []);
    }
    this.categories.get(metadata.category).push(metadata.name);

    // Register template mappings
    normalizedMetadata.templates.forEach(templateName => {
      this.templateMappings.set(templateName, metadata.name);
    });

    // Register aliases
    normalizedMetadata.aliases.forEach(alias => {
      this.templateMappings.set(alias, metadata.name);
    });

    return this;
  }

  /**
   * Register multiple effects at once
   *
   * @param {EffectMetadata[]} metadataArray - Array of effect metadata objects
   * @returns {EffectRegistry} This registry instance for chaining
   */
  registerMultiple(metadataArray) {
    metadataArray.forEach(metadata => this.register(metadata));
    return this;
  }

  /**
   * Get effect metadata by name or template name
   *
   * @param {string} nameOrTemplate - Effect name or template name
   * @returns {EffectMetadata|null} Effect metadata or null if not found
   */
  get(nameOrTemplate) {
    // Try direct effect name lookup
    if (this.effects.has(nameOrTemplate)) {
      return this.effects.get(nameOrTemplate);
    }

    // Try template mapping lookup
    if (this.templateMappings.has(nameOrTemplate)) {
      const effectName = this.templateMappings.get(nameOrTemplate);
      return this.effects.get(effectName);
    }

    return null;
  }

  /**
   * Check if an effect exists
   *
   * @param {string} nameOrTemplate - Effect name or template name
   * @returns {boolean} True if effect exists
   */
  has(nameOrTemplate) {
    return this.get(nameOrTemplate) !== null;
  }

  /**
   * Get all effects in a category
   *
   * @param {string} category - Category name
   * @returns {EffectMetadata[]} Array of effect metadata
   */
  getByCategory(category) {
    const effectNames = this.categories.get(category) || [];
    return effectNames.map(name => this.effects.get(name));
  }

  /**
   * Get all registered categories
   *
   * @returns {string[]} Array of category names
   */
  getCategories() {
    return Array.from(this.categories.keys());
  }

  /**
   * Get all registered effects
   *
   * @returns {EffectMetadata[]} Array of all effect metadata
   */
  getAllEffects() {
    return Array.from(this.effects.values());
  }

  /**
   * Get effect generator function
   *
   * @param {string} nameOrTemplate - Effect name or template name
   * @returns {Function|null} Generator function or null if not found
   */
  getGenerator(nameOrTemplate) {
    const metadata = this.get(nameOrTemplate);
    return metadata ? metadata.generator : null;
  }

  /**
   * Unregister an effect
   *
   * @param {string} name - Effect name to unregister
   * @returns {boolean} True if effect was unregistered
   */
  unregister(name) {
    const metadata = this.effects.get(name);
    if (!metadata) {
      return false;
    }

    // Remove from effects map
    this.effects.delete(name);

    // Remove from category
    const categoryEffects = this.categories.get(metadata.category);
    if (categoryEffects) {
      const index = categoryEffects.indexOf(name);
      if (index !== -1) {
        categoryEffects.splice(index, 1);
      }
    }

    // Remove template mappings
    metadata.templates.forEach(template => {
      this.templateMappings.delete(template);
    });

    // Remove aliases
    metadata.aliases.forEach(alias => {
      this.templateMappings.delete(alias);
    });

    return true;
  }

  /**
   * Clear all registered effects
   */
  clear() {
    this.effects.clear();
    this.categories.clear();
    this.templateMappings.clear();
  }

  /**
   * Get statistics about registered effects
   *
   * @returns {Object} Statistics object
   */
  getStats() {
    return {
      totalEffects: this.effects.size,
      totalCategories: this.categories.size,
      totalTemplateMappings: this.templateMappings.size,
      effectsByCategory: Object.fromEntries(
        Array.from(this.categories.entries()).map(([category, effects]) => [
          category,
          effects.length
        ])
      )
    };
  }
}

// Create singleton instance
const effectRegistry = new EffectRegistry();

module.exports = {
  EffectRegistry,
  effectRegistry
};
