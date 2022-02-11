const textAreaArray = document.querySelectorAll('textarea')
const [source_textArea, target_textArea] = textAreaArray;
const select = document.querySelectorAll('select')[1]

let target_language = 'en';

select.addEventListener("change", () => { 
    const selectIndex = select.selectedIndex ;
    target_language = select.options[selectIndex].value 
});

// console.log(target_language);

let debouncer;


source_textArea.addEventListener("input", (event) => { 
    // console.log(event.target.value);
    if (debouncer){
        clearTimeout(debouncer);
    }

    debouncer = setTimeout(() => {
       const text = event.target.value;
       const xhttp = new XMLHttpRequest();
       const url ="/translate";
       
       xhttp.open("POST",url)
       xhttp.setRequestHeader("Content-type", "application/json");
       xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(typeof xhttp.responseText);
                const data = xhttp.responseText;
                console.log('데이터',data); 

                console.log(typeof data);

                const parsedToJSON = JSON.parse(data);
                target_textArea.value = decodeURIComponent(unescape(parsedToJSON.translated_text));
                
            }
       }
        const data = {
            text,
            target_language
        };

        xhttp.send(JSON.stringify(data));

    }, 1500);

}); 