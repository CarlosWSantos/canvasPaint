//Sumário:
/*
	*/

//Tradução Inglês/Português

//classe para armazenamento mais fácil
class Linguagem{ 
   constructor(pencilModeL, eraserModeL, randomModeL, lineModeL, textModeL, lineTypeL1, lineTypeL2)
   {
		this.pencilModeL = pencilModeL;
		this.eraserModeL = eraserModeL;
		this.randomModeL = randomModeL;
		this.lineModeL = lineModeL;
		this.textModeL = textModeL;
		this.lineTypeL1 = lineTypeL1;
		this.lineTypeL2 = lineTypeL2;
   }
}
//Português
var portugues = new Linguagem(null, null, null, null, null, null, null, null);
portugues.pencilModeL = 'Modo: Lápis';
portugues.eraserModeL = 'Modo: Borracha';
portugues.randomModeL = 'Modo: Random';
portugues.lineModeL = 'Modo: Linha';
portugues.textModeL = 'Modo: Texto';
portugues.lineTypeL1 = 'Linha: Reta';
portugues.lineTypeL2 = 'Linha: Arrendondada';

//Inglês
var ingles = new Linguagem(null, null, null, null, null, null, null, null, null);
ingles.pencilModeL = 'Pencil mode';
ingles.eraserModeL = 'Eraser mode';
ingles.randomModeL = 'Random mode';
ingles.lineModeL = 'Line mode';
ingles.textModeL = 'Text mode';
ingles.lineTypeL1 = 'Line: straight';
ingles.lineTypeL2 = 'Line: round';


//variáveis

//canvas
var canvas = document.getElementById('canvas');

//canvas context
var cC = canvas.getContext('2d');

//grossura da pintura (círculos e quadrados)
var grossura = 20;

//valor padrão da grossura para mudar quando necessário
const GROSSURADEFAULT = 20;

//valor do 'value' do botão da cor (mencionado mais tarde no código)
var color;

//modo de desenho para ser usado no switch
var mode = 1;

//valor máximo para cores (aleatórias) no modo random (usuário pode alterar)
var maxRandom = 255;


//botões e labels para serem alterados na tradução >>>

var lineBtn = document.getElementById('lineTypeBtn');

//pegar o texto do usuário
var userText = document.getElementById('userText');

//botão para mudar de modo
var modeButton = document.getElementById('mode');

//o botão da cor para atualizar a cor do usuário
var cor = document.getElementById('cor');

//botão
var clearBtn = document.getElementById('apagarB');

//Botões para atualizar quando escolher a lingua ingles
var defthickness = document.getElementById('q');

var colorText = document.getElementById('color');

var maxRandomBtn = document.getElementById('maxRandom'); 

var textSentence = document.getElementById('textSentence');

var thick = document.getElementById('thick');

//imagem do usuário para o modo imagem
var img = document.getElementById('userImg');

var maxRInput = document.getElementById('colorMaxInput');
//<<<<<<

//Linguagem atual
var currentLanguage;

//tipo de linha
var lineType = 1;

//'switch' para alternar o modo de cor do modo random
var randomQ = 1;

//'trigger' para alternar entre desenhar ou não sem precisar usar setInterval(); setTimeOut(); ou requestAnimationFrame();
var pressedQ = false;


//funções >>>>>>

	//array para 'salvar' o canvas
	var commands = [];

	//declaração dos tipos de comandos a serem usados no array
	var commandTypes = {
	  drawCircle: function (posX, posY, size, color) {
	    cC.fillStyle = color;
	    cC.beginPath();
	    cC.arc(posX, posY, size, 0, Math.PI * 2, true);
	    cC.fill();
	  }
	};

	//interação com o array
	function execute() {
	  var commandType = arguments[0];
	  var data = Array.prototype.slice.call(arguments, 1);
	  
	  if (!commandTypes.hasOwnProperty(commandType))
	    throw new Error(commandType + 'rolha de cu');

	  commandTypes[commandType].apply(null, data);
	}

	//'executar' o ctrl+z basicamente
	function pushAndExecute() {
  		commands.push(arguments);
  		execute.apply(null, arguments);
	}

	function handleKeys(evt) {
  		if (evt.ctrlKey && evt.key === 'z') {
    

    	// tirar o último comando da lista dos saves de para o ctrl+z
    	commands.splice(-1, 1);

    	// Clear no canvas
    	cC.clearRect(0, 0, canvas.width, canvas.height);

   		// Desenhar o ultimo save -1 no canvas
    	commands.forEach(function (command) {
      		execute.apply(null, command);
    		});
  		}
	}

	//desenhar quadrados (usado no modo borracha)
	function writeRects(leftX, topY, width, height, drawColor)
	{
		cC.fillStyle = drawColor;
		cC.fillRect(leftX, topY, width, height);
	}

	//Pegar a localização do mouse
	function getMousePosition(evt) 
	{	
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft + window.scrollX;
		var mouseY = evt.clientY - rect.top - root.scrollTop + window.scrollY;
		return {
			x:mouseX,
			y:mouseY
		};
	}

	//desenhar
	function pencil(evt) { 
  		if (!pressedQ) return;
  			var mousePos = getMousePosition(evt);
  			pushAndExecute('drawCircle', mousePos.x, mousePos.y, grossura, color);
	}

	//começar a desenhar a linha
	function line(evt)
	{
		var mousePos = getMousePosition(evt);
		cC.beginPath();
  		cC.moveTo(mousePos.x, mousePos.y);
	}

	//terminar a linha
	function lineTo(evt)
	{
		var mousePos = getMousePosition(evt);
		cC.lineTo(mousePos.x, mousePos.y);
  		cC.lineWidth = grossura;
  		cC.strokeStyle = color;
  		if(lineType === 1)
  		{
  			cC.lineCap = 'butt';
  		}
  		else
  		{
  			cC.lineCap = 'round';
  		}
  		cC.stroke();
	}

	//apagar a tela
	function limpar()
	{
		cC.clearRect(0, 0, canvas.width, canvas.height);
		console.log("Limpo");
	}

	//aumentar / diminuir grossura
	function aumentarDiminuirGrossura(question)
	{
		grossura = question;
		if (question === 999999)
		{
			grossura = GROSSURADEFAULT;

		}
		else{}
	}

	//pegar cor escolhida pelo usuário
	function getColor()
	{
		color = cor.value;
	}

	//borracha
	function borracha(evt)
	{
		var mousePos = getMousePosition(evt);
		writeRects(mousePos.x, mousePos.y, grossura, grossura, 'white');
	}

	//modo de cor aleatório
	function randomMode(evt)
	{
		maxRandom = maxRInput.value;
		var mousePos = getMousePosition(evt);
		var randomRGB1 = Math.floor(Math.random(100) * (maxRandom - 0) + 0);
		var randomRGB2 = Math.floor(Math.random(100) * (255 - 0) + 0);
		var randomRGB3 = Math.floor(Math.random(100) * (255 - 0) + 0);
		if (randomQ === 1)
		{
			cC.fillStyle = "#"+(randomRGB1).toString(16)+(randomRGB2).toString(16)+(randomRGB3).toString(16);
		}
		else if (randomQ === 2)
		{
			cC.fillStyle = "hsl("+(randomRGB1).toString(16)+ ", " + "100%, 50%)";
		}
		else if (randomQ === 3)
		{
			randomQ = 1;
		}
		cC.beginPath();
		cC.arc(mousePos.x, mousePos.y, grossura, 0,Math.PI*2, true);
		cC.fill();
	}

	//executar os modos
	function paintMode()
	{
		switch(mode)
		{
			case 1:
				canvas.removeEventListener('mousedown', textMode);
				canvas.removeEventListener('mousedown', line);
				canvas.removeEventListener('mouseup', lineTo);
				canvas.removeEventListener('mousedown', imgMode);
					if (pressedQ === true)
					{
						document.addEventListener('mousemove', pencil);
						document.addEventListener('touchmove', pencil);
					}
					else
					{
						document.removeEventListener('mousemove', pencil); document.removeEventListener('touchmove', pencil);}	
			break;

			case 2:
				canvas.removeEventListener('mousedown', textMode);
				if (pressedQ === true)
				{
					canvas.addEventListener('touchmove', borracha);
					canvas.addEventListener('mousemove', borracha);
				}
				else{canvas.removeEventListener('touchmove', borracha); canvas.removeEventListener('mousemove', borracha);}
				
			break;
			case 3:
				canvas.removeEventListener('mousedown', textMode);
				if (pressedQ === true)
				{
					document.addEventListener('mousemove', randomMode);
					document.addEventListener('touchmove', randomMode);
				}
				else{document.removeEventListener('mousemove', randomMode); document.addEventListener('touchmove', randomMode)}
							
			break;
			case 4:
				canvas.addEventListener('mousedown', line);
				canvas.addEventListener('mouseup', lineTo);
				canvas.removeEventListener('mousedown', textMode);
			break;
			case 5:
				canvas.removeEventListener('mousedown', line);
				canvas.removeEventListener('mouseup', lineTo);
				canvas.addEventListener('mousedown', textMode);
			break;
			case 6:
				canvas.removeEventListener('mousedown', line);
				canvas.removeEventListener('mouseup', lineTo);
				canvas.removeEventListener('mousedown', textMode);
				canvas.addEventListener('mousedown', imgMode);
			break;
		}
	}

	//mudar o modo de desenho
	function modeChange()
	{
		console.log("modo alterado");
		mode++;
		if (mode === 7)
		{
			mode = 1;
		}
		else{}
		switch(mode)
		{
			case 1:
				if(currentLanguage == true)//ingles
				{
					modeButton.innerText = ingles.pencilModeL;
				}
				else//portugues
				{
					modeButton.innerText = portugues.pencilModeL;
				}
			break;

			case 2:
				if(currentLanguage == true)//ingles
				{
					modeButton.innerText = ingles.eraserModeL;
				}
				else//portugues
				{
					modeButton.innerText = portugues.eraserModeL;
				}
			break;

			case 3:
				
				if(currentLanguage == true)//ingles
				{
					modeButton.innerText = ingles.randomModeL;
				}
				else//portugues
				{
					modeButton.innerText = portugues.randomModeL;
				}
			break;

			case 4:
				if(currentLanguage == true)//ingles
				{
					modeButton.innerText = ingles.lineModeL;
				}
				else//portugues
				{
					modeButton.innerText = portugues.lineModeL;
				}
			break;

			case 5:
				if(currentLanguage == true)//ingles
				{
					modeButton.innerText = ingles.textModeL;
				}
				else//portugues
				{
					modeButton.innerText = portugues.textModeL;
				}
			break;

			case 6:
			modeButton.innerText = 'Modo imagem';
			break;
		}
	}

	//ativar o desenho
	function activate(textmode, evt)
	{
		pressedQ = true;
		console.log("Desenho iniciado");
	}

	//desligar o desenho
	function deactivate()
	{
		pressedQ = false;
		console.log("Desenho encerrado");
	}

	//mudar o tipo de linha 
	function changeLineType()
	{
		lineType++;
		switch(lineType)
		{
			case 1:
				if(currentLanguage == true)//ingles
				{
					lineTypeBtn.innerText = ingles.lineTypeL1;
				}
				else//portugues
				{
					lineTypeBtn.innerText = portugues.lineTypeL1;
				}
			break;

			case 2:
				if(currentLanguage == true)//ingles
				{
					lineTypeBtn.innerText = ingles.lineTypeL2;
				}
				else//portugues
				{
					lineTypeBtn.innerText = portugues.lineTypeL2;
				}
			break;

			case 3:
				if(currentLanguage == true)//ingles
				{
					lineTypeBtn.innerText = ingles.lineTypeL1;
				}
				else//portugues
				{
					lineTypeBtn.innerText = portugues.lineTypeL1;
				}
				lineType = 1;
			break;
		}
	}

	//escrever texto no canvas
	function textMode(evt)
	{
		var mousePos = getMousePosition(evt);
		var actualText = userText.value;
		cC.font = grossura + "px Arial";
		cC.fillStyle = color;
		cC.fillText(actualText, mousePos.x, mousePos.y);
	}

	function imgMode(evt)
	{
		//coordenada do mouse
		var mousePos = getMousePosition(evt);
		if(document.getElementById('userImg').value)
		{
			var image = new Image();
			image.onload = () => {
			  cC.imageSmoothingEnabled = false;
			  cC.drawImage(image, mousePos.x, mousePos.y, grossura, grossura);
			};
			image.src = document.getElementById('userImg').value;
		}
		else{
			//declaração da imagem padrão
	        var image = new Image();
	        //atributo da imagem padrão
			image.src = 'https://i1.sndcdn.com/artworks-000186623690-weno61-t500x500.jpg';
			//quando a imagem for carregada ela estará pronta para ser desenhada no canvas sem nenhum erro
			image.onload = function() {
	        cC.drawImage(image, mousePos.x, mousePos.y, grossura, grossura);
	    	}
    	}
	}

	//gerar preview do canvas para o usuário
	function convertCanvasToImage() 
	{
		var image = canvas.toDataURL();
		var previewImg = document.getElementById('preview');
		previewImg.src = image;
		previewImg.style.width = 100 + 'px';
		previewImg.style.height = 100 + 'px';
		previewImg.style.top = 20 + 'px';
		previewImg.style.left = 500 + 'px';
		previewImg.style.width = 300 + 'px';
		previewImg.style.height = 180 + 'px';
		previewImg.style.border = 'solid black 1px';
		previewImg.style.borderRadius = 8 + 'px';
	}

	//abrir e fechar o menu
	function openNav() {
	  document.getElementById("menu").style.width = "250px";
	}

	function closeNav() {
	  document.getElementById("menu").style.width = "0";
	}

//carregar quando a página iniciar
window.onload = function()
{
	//pegar linguagem
	if (confirm("Hi!\nPlease, click 'OK' for English or 'Cancel' for Portuguese.")) 
	{
    	currentLanguage = true;

		//botão para mudar o tipo de linha
		lineBtn.innerText = 'Line: straight';

		//botão para mudar de modo
		modeButton.innerText = 'Pencil mode';

		clearBtn.innerText = 'Clear';
		
		defthickness.innerText = 'Default Thickness';

		colorText.innerText = 'Color: ';

		maxRandomBtn.innerText = 'Max value for random mode:'; 

		textSentence.innerText = 'Text for text mode:';

		thick.innerText = 'Thickness:';

		document.getElementById('userImgText').innerText = 'URL for Image mode:';

  	} 
  	else
  	{
    	currentLanguage = false;
  	}

	canvas.addEventListener('mousedown', activate);
	canvas.addEventListener('touchmove', paintMode);
	canvas.addEventListener('mousemove', paintMode);
	canvas.addEventListener('mouseup', deactivate);
  	window.addEventListener('keydown', handleKeys);
}



/*

Notas:

Adicionar modo imagem (FEITO)

Adicionar Ctrl+z (FEITO)

Adicionar Zoom (X)

Adicionar gradient para o modo linha (X)

Adicionar um menu no canto da tela (FEITO)

Fazer o atalho de 'save' e o modo retornar a partir do 'save' (X)

Fazer instruções

*/