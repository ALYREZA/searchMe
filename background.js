const getActiveTab = async () => {
  return (
    await browser.tabs.query({
      active: true,
      currentWindow: true
    })
  )[0];
};
const exeCommand = async id => {
  return (
    await browser.tabs.executeScript(id, {
      code: 'getSelection()+""'
    })
  )[0];
};

browser.commands.onCommand.addListener(command => {
  getActiveTab()
    .then(({ id }) => {
      exeCommand(id)
        .then(txt => {
          const url = "https://www.google.co.uk/search?q=";
          const searchItem = encodeURI(txt);
          const fullUrl = url + searchItem;
          browser.tabs.create({ url: fullUrl });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});
