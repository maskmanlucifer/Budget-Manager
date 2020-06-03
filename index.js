/*displaying totalspend and limit after opening of page.*/
chrome.storage.sync.get(['tota','limi'],function(budget)
{
    let v1=0,v2=0;
    if(budget.tota)
    {
    v1+=budget.tota;
    }
    if(budget.limi)
    {
    v2+=budget.limi;
    }
    v1=parseInt(v1);
    v2=parseInt(v2);
    document.getElementById("total").innerHTML=v1;
    document.getElementById("set").innerHTML=v1;
});

/*submit after each entry.*/
document.getElementById("submit").addEventListener("click",addthis);
function addthis()
{
    
    chrome.storage.sync.get(['tota','limi'],function(budget)
    {
        var newtotal=0;
        if(budget.tota)
        {
            newtotal+=parseInt(budget.tota);
        }

        let ammo=document.getElementById("amount").value;

        if(ammo)
        {
            newtotal+=parseInt(ammo);
        }
        /*sending notification if limit is reached.*/
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
            }

        }
        /*setting new values.*/
        chrome.storage.sync.set({"tota":newtotal});
        document.getElementById("total").innerHTML=newtotal;
        document.getElementById("amount").value=null;
    });
}