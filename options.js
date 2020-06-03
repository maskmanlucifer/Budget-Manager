/*setting limit in input box after load.*/
chrome.storage.sync.get("limi",function(budget)
{
    let v=0;
    if(budget.limi)
    {
    v+=budget.limi;
    }
    v=parseInt(v);
    document.getElementById("limit").value=v;
})

/*setting new limit.*/
document.getElementById("savelimit").addEventListener("click",savelimi);
function savelimi()
{
    let v=document.getElementById("limit").value;
    if(v)
    {
        v=parseInt(v);
        chrome.storage.sync.set({"limi":v});
        window.close();
    }

}

/*reseting total.*/
document.getElementById("resettotal").addEventListener("click",reset);
function reset()
{

    chrome.storage.sync.set({"tota":0});
    /*sending notification after reset.*/
    var option=
    {
        type:"basic",
        title:"Reset Total.",
        message:"Total has been reset to zero.",
        iconUrl:"icon48.png"
    };
    chrome.notifications.create('notify',option,callback);
    function callback()
    {
        console.log("some error occured");
    }
}
