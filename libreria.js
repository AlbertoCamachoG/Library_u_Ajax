/*****************
      MODELO
*****************/
var checked=[false,false];
var autores=[];

function loadLibros() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       libros=JSON.parse(this.response).libros;
       for(var i=0;i<libros.length;i++){
           vControler(libros[i]);
           autores.push(libros[i].Author);
       }
       removeDuplicates(autores);
       autores.sort();
       fillAuthorController();
      }
    };
    xhttp.open("GET", "./Novelas/libros.json", true);
    xhttp.send();
}

function filtrar(filtro) {
    filtro=filtro.value;
    lang=document.getElementById("language");
    aut=document.getElementById("authors");
    fini=document.getElementById("finish");
    read=document.getElementById("noFinish");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       libros=JSON.parse(this.response).libros;
       for(var i=0;i<libros.length;i++){
            if(libros[i].Name.toUpperCase().includes(filtro.toUpperCase())){
                if(lang.value=="none"){
                    if(aut.value=="none"){
                        if(fini.checked==false && read.checked==false){
                            vControler(libros[i]);
                        }else{
                            if(fini.checked){
                                if(libros[i].Status=="Finished"){
                                    vControler(libros[i]);
                                }
                            }else{
                                if(libros[i].Status=="Reading"){
                                    vControler(libros[i]);
                                }
                            }
                        }
                    }else{
                        if(aut.value==libros[i].Author){
                            if(fini.checked==false && read.checked==false){
                                vControler(libros[i]);
                            }else{
                                if(fini.checked){
                                    if(libros[i].Status=="Finished"){
                                        vControler(libros[i]);
                                    }
                                }else{
                                    if(libros[i].Status=="Reading"){
                                        vControler(libros[i]);
                                    }
                                }
                            }
                        }
                    }
                }else{
                    if(lang.value==libros[i].Language){
                        if(aut.value=="none"){
                            if(fini.checked==false && read.checked==false){
                                vControler(libros[i]);
                            }else{
                                if(fini.checked){
                                    if(libros[i].Status=="Finished"){
                                        vControler(libros[i]);
                                    }
                                }else{
                                    if(libros[i].Status=="Reading"){
                                        vControler(libros[i]);
                                    }
                                }
                            }
                        }else{
                            if(aut.value==libros[i].Author){
                                if(fini.checked==false && read.checked==false){
                                    vControler(libros[i]);
                                }else{
                                    if(fini.checked){
                                        if(libros[i].Status=="Finished"){
                                            vControler(libros[i]);
                                        }
                                    }else{
                                        if(libros[i].Status="Reading"){
                                            vControler(libros[i]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
       }
      }
    };
    xhttp.open("GET", "./Novelas/libros.json", true);
    xhttp.send();
}


function removeDuplicates(arr){
    for(var i=0;i<arr.length;i++){
        valid=true;
        for(var j=0;j<arr.length;j++){
            if(arr[i]==arr[j] && i!=j){
                arr.splice(i,1);
            }
        };
    };
    return(arr);
}
/*****************
      VISTA
*****************/
function visualizar(libro){
    var div=document.createElement("div");
    div.style.display="flex";
    div.style.flexDirection="column";
    div.style.margin="40px";
    div.style.borderRadius="30px";
    div.style.border="solid 1px white";
    div.style.height="fit-content";
    div.style.width="15%";
    div.style.boxSizing="border-box";
    
    var image=document.createElement("img");
    image.src="./images/portadas/"+libro.Name+".png";
    image.style.padding="30px";
    image.style.margin="5px";
    image.style.height="300px";
    image.style.paddingBottom="5px";
    var nombre=document.createElement("p");
    nombre.innerText=libro.Name;
    nombre.style.textAlign="center";
    nombre.style.color="azure";
    nombre.style.width="70%";
    nombre.style.margin="auto";
    nombre.style.marginBottom="20px";
    nombre.style.marginTop="20px";
    //appends
    div.appendChild(image);
    div.appendChild(nombre);
    div.addEventListener("click",function(){mostrarDatos(libro)});
    document.getElementById("padre").append(div);
}

function mostrarDatos(libro){
    if(document.getElementById("datos"))document.getElementById("datos").remove();
    let div=document.createElement("div");
    div.style.backgroundColor="azure";
    div.style.borderRadius="20px";
    div.style.zIndex=1;
    div.tabIndex=0;
    div.style.alignSelf="center";
    div.style.width="40%";
    div.style.marginLeft="20%";
    div.style.marginRight="20%";
    div.setAttribute("id","datos");
    div.addEventListener("focusout",function(){if(document.getElementById("datos"))document.getElementById("datos").remove();});
    //table
    let corpo=document.createElement("div");
    let header=document.createElement("header");
    let footer=document.createElement("footer");
    let pAutor=document.createElement("p");
    let pCap=document.createElement("p");
    let pLang=document.createElement("p");
    let pFanfic=document.createElement("p");
    let pLastChapter=document.createElement("p");
    let pReadDate=document.createElement("p");
    header.innerText=libro.Name;
    footer.innerText=libro.Status
    if(libro.TimesRead!=0)footer.innerText+=" | x"+libro.TimesRead;
    pAutor.innerText="Author: "+libro.Author;
    pCap.innerText="Chapters: "+libro.Chapters;
    pLang.innerText="Language: "+libro.Language;
    pReadDate.innerText="Finish Date: "+libro.FinishedDate;
    pFanfic.innerText="Fanfic of: "+libro.Fanfiction;
    pLastChapter.innerText="Last Chapter Read: "+libro.LastChapter;
    //appends
    corpo.append(pAutor);
    corpo.append(pCap);
    corpo.append(pLang);
    if(libro.Fanfiction)corpo.append(pFanfic);
    if(libro.LastChapter)corpo.append(pLastChapter);
    if(libro.FinishedDate)corpo.append(pReadDate);
    div.append(header);
    div.append(corpo);
    div.append(footer);
    document.getElementById("padre").appendChild(div);
    div.focus();
}

function clear(){
    document.getElementById("padre").innerHTML="";
}

function checkALook(id,n){
    id=document.getElementById(id);
    if(checked[n]==false){
        id.checked=true;
        checked[n]=true;
        if(n==0){checked[1]=false;}else{
            if(n==1){checked[0]=false;}
        }
        
    }else{
        id.checked=false;
        checked[n]=false;
        if(n==0){checked[1]=false;}else{
            if(n==1){checked[0]=false;}
        }
    }
}

function fillAuthors(container){
    var select=document.createElement("select");
    select.name="author";
    select.id="authors";
    let option1=document.createElement("option");
    option1.value="none";
    option1.innerText="Author";
    select.append(option1);
    for(var i=0;i<autores.length;i++){
        var option=document.createElement("option");
        option.value=autores[i];
        option.innerText=autores[i];
        select.append(option);
    }
    container.appendChild(select);
}

/*****************
   CONTROLADOR
*****************/
function initialize(){
    document.getElementById("lupa").addEventListener("click",function(){document.getElementById("padre").innerHTML="";filtrar(document.getElementById("busqueda"))});
    document.getElementById("logo").addEventListener("click",function(){restart()});
    document.getElementById("finish").addEventListener("click",function(){checkALook("finish",0)});
    document.getElementById("noFinish").addEventListener("click",function(){checkALook("noFinish",1)});
    loadLibros();
}

function vControler(libro){
    visualizar(libro);
}

function fillAuthorController(){
    fillAuthors(document.getElementById("autores"));
}

function restart(){
    clear();
    filtrar(document.getElementById("busqueda"));
}

/*---------------------------------------------------------------------------------------------*/
initialize();