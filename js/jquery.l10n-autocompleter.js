/****************************************************************/
/*  l10n AUTO COMPLETER - JQUERY PLUGIN                 */
/*  LUIGUI DELYER@S1X - luigui@s1x.com.br                       */
/****************************************************************/

/*
    Note: all l10n-id's will be included after all content

    logViewer = show on console.log all information about how script works
    0 = off
    1 = on
*/

var l10nAttribute = 'data-l10n-ac',
    l10nID = $('*[' + l10nAttribute + ']'),
    l10nRef = "",
    logViewer = 0;

if (logViewer == 1) {
  console.log("[l10n-AC] plugin starts");
  console.log("[l10n-AC] objects found = " + l10nID.length);
  console.log("[l10n-AC] objects = ", l10nID);
}

if (l10nID.length > 0) {
  for (var i = 0; i < $(l10nID).length; i++) {
    if(l10nID[i].nodeName != "TITLE") {
      l10nRef = $(l10nID[i]).attr(l10nAttribute);
      $(l10nID[i]).append($("<span data-l10n-id='" + l10nRef + "'></span>")).removeAttr(l10nAttribute);

      if (logViewer == 1) {
        console.log("[l10n-AC] l10n included on = ", l10nID[i]);
      }
    }
  }

  if (logViewer == 1) {
    console.log("[l10n-AC] done");
  }
}
