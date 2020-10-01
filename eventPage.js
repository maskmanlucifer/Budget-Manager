/*for creating context menu object.*/
var contextMenuItem=
{
    "id":"spendMoney",
    "title":"spendmoney",
    "contexts":["selection"]
};
chrome.contextMenus.create(contextMenuItem);

/*adding in total from context menu.*/
chrome.contextMenus.onClicked.addListener(function(clickdata)
{
     if(clickdata.menuItemId=="spendMoney" && clickdata.selectionText)
     {
          if(clickdata.selectionText-0==clickdata.selectionText)
          {
              chrome.storage.sync.get(['tota','limi'],function(budget)
              {
                  var newtotal=0;
                  if(budget.tota)
                  {
                      newtotal+=parseInt(budget.tota);
                  }
                  newtotal+=parseInt(clickdata.selectionText);
                  chrome.storage.sync.set({'tota':newtotal});

                  /*sending notification if limit reached.*/
                  if(newtotal>=budget.limi)
                  {
                    var option={
                        type:"basic",
                        title:"Limit reached",
                        message:"Your spending limit is reached.",
                        iconUrl:"icon48.png"
                    };
                    chrome.notifications.create('notify',option,callback);

                    function callback()
                    {
                        console.log("some error occured");
                        var wikiurl="https://en.error.org/";
                        var createdata={
                            "url":wikiurl,
                            "type":"popup",
                            "top":5,
                            "left":5,
                            "height":screen.availHeight/2,
                            "width":screen.availWidth/2
                        };
                        chrome.windows.create(createdata,function(){});
                    }
                  }
              })
          }
     }
    })

    /*for badge.*/
    chrome.storage.onChanged.addListener(function(changes,storageName)
    {
        chrome.storage.sync.get(['tota','limi'],function(budget)
        {
            chrome.browserAction.setBadgeText({"text":budget.tota.toString()});
        })
    });
