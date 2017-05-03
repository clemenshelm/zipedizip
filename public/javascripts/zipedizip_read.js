document.getElementById('zip_file').addEventListener('change', ({ target }) => {
  const zipFile = readFile(target.files[0]);

  const containedFilePaths = []
  JSZip.loadAsync(zipFile)
  .then(zip => {
    zip.forEach(path => containedFilePaths.push(path));

    const listElements = containedFilePaths.map(p => `<li>${p}</li>`);
    document.getElementById('zip_content').innerHTML = `<ul>${listElements.join('')}</ul>`;
  });
});
