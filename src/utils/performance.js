// Performance monitoring utilities

export const measurePerformance = (name, fn) => {
  if (typeof window === 'undefined') return fn();
  
  const startTime = performance.now();
  const result = fn();
  const endTime = performance.now();
  
  const duration = endTime - startTime;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }
  
  // Send to analytics if needed
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name,
      value: Math.round(duration),
      event_category: 'Performance',
    });
  }
  
  return result;
};

export const measureRenderTime = (componentName) => {
  if (typeof window === 'undefined') return;
  
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name.includes(componentName)) {
        console.log(`[Render] ${componentName}: ${entry.duration.toFixed(2)}ms`);
      }
    });
  });
  
  observer.observe({ entryTypes: ['measure'] });
  
  return observer;
};

export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Lazy loading helper
export const lazyWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

// Check if device has low performance
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check device memory (if available)
  const deviceMemory = navigator.deviceMemory || 4;
  
  // Check hardware concurrency
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  
  // Check connection type
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowConnection = connection && (connection.saveData || connection.effectiveType === '2g');
  
  return prefersReducedMotion || deviceMemory < 4 || hardwareConcurrency < 4 || isSlowConnection;
};

// Optimize animations based on device performance
export const getAnimationDuration = (baseDuration) => {
  if (isLowEndDevice()) {
    return baseDuration * 0.5; // Faster animations on low-end devices
  }
  return baseDuration;
};

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};