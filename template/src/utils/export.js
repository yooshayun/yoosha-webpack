export function exportExl(url){
    let newLink = document.createElement('a');
        document.body.appendChild(newLink);
        newLink.href = url;
        newLink.target = '_blank';
        newLink.click();
        document.body.removeChild(newLink);
}