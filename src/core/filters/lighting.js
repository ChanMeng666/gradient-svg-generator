/**
 * Specular lighting filter — simulates a light source reflecting off a surface.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {number} [options.specularConstant=1.5] - Light constant
 * @param {number} [options.specularExponent=20] - Light exponent
 * @param {string} [options.lightColor='white'] - Light color
 * @param {{x:number,y:number,z:number}} [options.lightPosition={x:427,y:60,z:100}]
 * @returns {string} SVG filter definition
 */
function createSpecularLightingFilter(id, options = {}) {
  const {
    specularConstant = 1.5,
    specularExponent = 20,
    lightColor = 'white',
    lightPosition = { x: 427, y: 60, z: 100 },
  } = options;

  return `
    <filter id="${id}">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
      <feSpecularLighting in="blur" specularConstant="${specularConstant}" specularExponent="${specularExponent}" lighting-color="${lightColor}">
        <fePointLight x="${lightPosition.x}" y="${lightPosition.y}" z="${lightPosition.z}"/>
      </feSpecularLighting>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>`;
}

module.exports = { createSpecularLightingFilter };
