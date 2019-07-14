/**
*    Evaluate xpath string
*    @param aNode context node
*    @param aExpr Xpath expression
**/
function xpathEval( aNode, aExpr ) {
    // if only xpath string provided
    if ( arguments.length == 1 ) {
        aExpr = aNode;
        aNode = document;
    }

    var xpe = new XPathEvaluator(),
        nsResolver = xpe.createNSResolver( !aNode.ownerDocument ?
                                           aNode.documentElement :
                                           aNode.ownerDocument.documentElement ),
        result = xpe.evaluate( aExpr, aNode.documentElement ?
                               aNode.documentElement :
                               aNode, nsResolver, 0, null ),
        found = [],
        res;

    if ( result.resultType == 4 ) {
        while ( res = result.iterateNext() ) {
            found.push( res );
        }
        if ( found.length ) {
            return found;
        } else {
            return false;
        }
    }
    if ( result.resultType == 2 ) {
        return result.stringValue;
    }
}

function initSubtitles(){
    const initSubtitlesBtn = xpathEval("//*[contains(@class,'imageButton subtitlesAndAudioButton')]");
    if( initSubtitlesBtn ){
        initSubtitlesBtn[0].click()
    }
}

function enableSubtitle(){
    const enableXpath = "((.//*[contains(@class,'subtitles')])[4]//*[contains(@class,'radioButtonGroup')])[1]//*[contains(@class,'text')]/span[text()='English']";

    if( inititalizationNeeded() ){
        initSubtitles();
        setTimeout(()=>{
            xpathEval(enableXpath)[0].click()
        },2000)
    }else{
        xpathEval(enableXpath)[0].click()
    }
}

function disableSubtitle(){
    xpathEval(".//*[contains(@class,'subtitles')]//*[contains(@class,'radioButtonGroup')]//*[contains(@class,'text') and text()='Off']/../*")[0].click()
}

function inititalizationNeeded(){
    const allAvailableSubtitiles = xpathEval("((.//*[contains(@class,'subtitles')])[4]//*[contains(@class,'radioButtonGroup')])[1]//*[contains(@class,'text')]");
    return !( allAvailableSubtitiles.length > 1 )
}

function isSubtitleDisabled(){
    return !!xpathEval(".//*[contains(@class,'subtitles')]//*[contains(@class,'radioButtonGroup')]//*[contains(@class,'checked')]/*[contains(@class,'text') and text()='Off']")
}

function KeyPress(e) {
    var evtobj = window.event? event : e

    if (evtobj.keyCode == 86) {
        if( isSubtitleDisabled() ){
            enableSubtitle();
        }else{
            disableSubtitle();
        }
    };
}

document.onkeydown = KeyPress;
