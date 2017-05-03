document.getElementById('files').addEventListener('change', ({ target }) => {
  const { files } = target;

  const readFiles = [...files].map(file => {
    const { name } = file;
    const contentPromise = readFile(file);

    return { name, contentPromise };
  })

  const zip = new JSZip();

  readFiles.forEach(({ name, contentPromise }) => {
    zip.file(name, contentPromise);
  });

  zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, 'zipedizipped.zip');
  });
}, false);

// add file as string
// zip.file('magic_spell.txt', 'zipedizipulus spectaculus!')
// zip.folder('texts').file('magic_spell.txt', 'zipedizipulus spectaculus!')

// add remote file
// const logoUrl = '/images/logo.jpg';
// JSZipUtils.getBinaryContent(logoUrl, (err, data) => zip.file('logo.jpg', data));

// add remote file with promise
// const logoUrl = '/images/logo.jpg';
// const downloadPromise = new Promise(resolve => {
//    JSZipUtils.getBinaryContent(logoUrl, (err, data) => resolve(data));
// });
// zip.file('logo.jpg', downloadPromise);
