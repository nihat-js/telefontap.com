function logRamUsage() {
  const memoryUsage = process.memoryUsage();
  const memoryUsageInMB = {
    rss: (memoryUsage.rss / (1024 * 1024)).toFixed(2) + " MB",
    // heapTotal: (memoryUsage.heapTotal / (1024 * 1024)).toFixed(2),
    // heapUsed: (memoryUsage.heapUsed / (1024 * 1024)).toFixed(2),
    // external: (memoryUsage.external / (1024 * 1024)).toFixed(2),
  };
  console.log(`Memory Usage (MB): ${JSON.stringify(memoryUsageInMB)}`);
}

module.exports = {
  logRamUsage
}