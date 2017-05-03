function readFile(file, resolve) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = (event) => {
      if (event.target.readyState == FileReader.DONE) {
        resolve(event.target.result);
      }
    }

    reader.readAsBinaryString(file);
  })
}
