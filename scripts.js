function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}


function getCopyFunction(text) {
    return copyTextToClipboard.bind(this, text)
}

function main(){
    const battle_net_link = document.getElementById('battle-net-link');
    const discord_link = document.getElementById('discord-link');
    battle_net_link.addEventListener('click', getCopyFunction('denexapp#2391'));
    discord_link.addEventListener('click', getCopyFunction('denexapp#2741'));
}

document.addEventListener('DOMContentLoaded', main);