---
id: docs-workshop
title: Workshop
sidebar_position: 2
---

# Workshop

## inleiding
Met artificiële intelligentie kan heel veel gedaan worden, in deze workshop gaan wij het echter beperkt houden om het niet te moeilijk te maken

Vooraleer er aan te beginnen wel even wat nodige theorie. Een neuraal netwerk is opgebouwd uit een hele hoop "nodes" en verbindingen. Zo een node en zijn relevante verbindingen is kort samen te vatten onder de structuur van een perceptron. Verbindingen in zo een perceptron noemen we weights.

![image perceptron](/img/perceptron.png)

## Enkele nodige bestanden
Om deze workshop correct uit te voeren wordt gevraagd om volgende bestanden te downloaden. Hierin zit een stuk voorafgeschreven code die nodig is voor een aantal opdrachten te doen werken: [files.zip](/files.zip)

## Perceptron kort stuk theorie
Wat zo een perceptron doet is eigenlijk niet meer dan de waarden dat die binnen krijgt te vermenigvuldigen met zijn corresponderende weights en al deze resultaten op te tellen. Zo een perceptron heeft ook nog een speciale input waarde genaamd de bias. Die bias heeft altijd de waarde 1 maar de verbinding naar de node zelf hoeft niet zelf 1 te zijn of te blijven zo kan toch een extra positieve of negatieve waarde toegevoegd worden aan de node om deze moeilijker of makkelijker te "activeren". Eigenlijk is er ook nog een activatie functie, maar hierover meer later.

## Opdracht perceptron
Om een idee te krijgen hoe dit werkt zullen we eerst een perceptron in de voorwaardse richting schrijven in python; Later meer over de omgekeerde richting die ervoor zorgt dat die kan leren. Om gemakkelijk te kunnen testen kan je als inputs 1, 2 en 4 gebruiken; Als weights gebruiken we 3, 2 en 1, en tenslotte kunnen we de bias ook eens testen met waarden 0 en 1, zo zullen de verwachte outputs respectievelijk 11 en 12 zijn.

### tips
:::tip
Je kan ook alle weights vermenigvuldigen met de inputs en achteraf de bias optellen.
:::
:::tip
Met de library numpy kan je makkelijk 2 arrays vermenigvuldigen door er eerst een ndarray van te maken:  
`variabele = np.array(<jouw array>)`  
en dan die gekregen ndarrays te vermenigvuldigen `variabele_1*variabele_2`  
hetzelfde geldt voor andere rekenkundige bewerkingen.
:::

:::tip
Met `np.sum(<jouw ndarray>)` krijg je de som van alle waarden in de meegegeven vector optellen.
:::

### spoiler
:::warning oplossing
<details>
<summary>klik om de oplossing te bekijken</summary>

```python
import numpy as np
input = np.array([1,2,4])
weights = np.array([3,2,1])
bias = np.array([0])
output = np.sum(input*weights) + bias
print(output[0])
```

</details>
:::

## activatiefuncties
Het probleem nu met een perceptron die enkel vermenigvuldigt en optelt is dat dit gewoon een lineair probleem blijft, dit is niet zo handig als je een scheiding in je data hebt dat niet op een lineaire manier te vinden is. Bovendien zou het achter elkaar zetten van meerdere perceptrons kunnen samengevat worden in 1 enkele perceptron, de oplossing hiervoor is een activatiefunctie. In deze workshop gaat enkel gewerkt worden met de activatiefuncties sigmoid of tanh; Afgeleiden van deze functies worden gebruikt in de terugkerende stap.

### sigmoid 
De functie sigmoid wordt gedefinieerd volgens de functie $sig(x)$ en afgeleide $sig'(x)$. Getoond is ook een geplotte versie van de functie(rood) en afgeleide(blauw)

$$
\begin{aligned}
sig(x) &= \frac{1}{1+e^{-x}} \\
sig'(x) &= sig(x) \cdot (1-sig(x))
\end{aligned}
$$
![plot sigmoid](/img/Sigmoid.png)
Dit is een van de mogelijke functies die de output van een perceptron niet-lineair maakt, maar bovendien zal deze de waarden ook in het domein `]0,1[` brengen.

### tanh
Gelijkaardig aan de sigmoid functie zal tanh de waarden in een beperkt bereik brengen, in dit geval is het echter `]-1,1[` en is de functie iets scherper dan sigmoid. Evenals de wiskundige notatie.
$$
\begin{aligned}
tanh(x)=\frac{e^{2x}-1}{e^{2x}+1} \\
tanh'(x) = 1-tanh(x)^2
\end{aligned}
$$
![plot tanh](/img/Tanh.png)

## Opdracht activatiefunctie
Nu kan de code die geschreven is van de perceptron verder aangepast worden om een activatiefunctie toe te voegen, probeer dit eerst eens zelf met de sigmoid functie. Je kan dit toevoegen onder de code die je eerder hebt geschreven (afgeleide niet nodig). Om geen waarden te dicht bij 1 te hebben tijdens testen zullen we iets kleinere waarden gebruiken, gebruik hier voor alle inputs 1, en als weights de waarden 0.3, 0.2 en 0.5. Als waarde voor bias mag je 0 nemen, het resultaat dat je zou moeten bekomen is `0.7310585786300049` voor sigmoid en `0.761594155955765` voor tanh 

:::tip
Numpy laat toe om functies uit te voeren op elk element van ndarrays. De output is ook van het type ndarray.
:::

:::warning oplossing
<details>
<summary>klik om de oplossing te bekijken</summary>

```python
import math
def sigmoid(x):
	return 1/(1+math.e**(-x))

def tanh(x):
	e2x = math.e**(2*x)
	return (e2x-1)/(e2x+1)

output = sigmoid(output)
print(output)
```

</details>
:::

## Samenstellen meerdere perceptrons
Het zou nu wel handig zijn om meerdere perceptrons samen te kunnen zetten in 1 laag zodat die allen op dezelfde input data kunnen werken. Hiervoor zullen we dus een klasse schrijven om deze lagen automatisch te laten aanmaken. Een snelle manier om dit in 1 keer te doen is door een matrix te gebruiken om weights te definieren in plaats van voor elke perceptron appart uit te rekenen.

Zo kan je alle weights voor één enkele perceptron in een rij van de matrix zetten en zoveel rijen aan te maken als het aantal outputs dat je wil, deze dan vermenigvuldigen (kruisproduct, "dot product" in het engels) met een kolommatrix van de inputs. Die kolommatrix is het makkelijkst te bekomen door de input ndarray te transponeren, daarna kan bij de output opnieuw een kolommatrix van biases mee opgeteld worden om een laag perceptrons te maken, evenals kan dan ook weer een functie op deze output worden uitgevoerd, maar dit zullen we doen in een ander type laag.

:::caution
Om een ndarray te transponeren zijn minstens 2 dimensies nodig, dit is het makkelijkst te initializeren met `input = np.array([[1,2,3]])` en te transponeren met `input.T`
:::

### opdracht samenstellen perceptrons
Voor dit stuk ga je zelf de matrixen opbouwen om een set perceptrons in 1 keer uit te werken, hiervoor maak je een matrix met een aantal rijen gelijk aan het aantal outputs en een aantal kolommen gelijk aan het aantal inputs. Daarna kan je het kruisproduct van weights met inputs.T nemen en de bias bij optellen. Let op, de bias is een kolommatrix met een aantal rijen gelijk aan het aantal outputs, om niet te veel te vragen van de computer gebruik je 3 inputs en 2 outputs.

In de praktijk worden weights en biases willekeurig in een range `[0,1]` geinitaliseerd, dit kan je doen door `np.random.rand(rijen, kolommen)` te gebruiken. Vanaf deze opdracht wordt dus geen data meer meegegeven om te testen, er wordt wel gevraagd dat de code werkt.

:::tip
In numpy zijn meerdere mogelijkheden om een dot product te nemen `matrixA@matrixB`, `np.dot(matrixA, matrixB)` of `matrixA.dot(matrixB)`
:::

:::warning oplossing
<details>
<summary>klik om de oplossing te bekijken</summary>

```
inputs = np.array([[1,1,1]]).T
weights = np.random.rand(2,3)
biases = np.random.rand(2,1)
output = weights@inputs + biases
print(output)
```

</details>
:::

## samenvoegen meerdere lagen perceptrons, Dense layer
Nu dat we kunnen werken met meerdere perceptrons in een keer zou het ook handig zijn om deze lagen achter elkaar te zetten. Hiervoor zijn al een aantal klassen geschreven om het werk van aanmaken van lagen een stuk makkelijker te laten verlopen. Er wordt van jullie gevraagd om in de volgende klasse de functie "\_\_forward" verder aan te vullen. Het enige verschil met wat we hiervoor gedaan hebben is dat we de input van de laag gaan opslaan in de variabelen `self.__input` en `self.__output` voor later gebruik.

:::tip
Vergeet niet om ook self.__output terug te geven (`return`).
:::

:::note
Gebruikbestandsnaam DenseLayer.py
:::

:::info Basiscode

Plaats jouw oplossing in de `__forward` functie.  
Je mag daar dan ook `pass` verwijderen.

```python
import numpy as np
from Layer import Layer

class DenseLayer(Layer):
    def __init__(self, weights, biases):
        if type(weights)!=np.ndarray or type(biases)!=np.ndarray:
            raise ValueError("weights and biases must be of type numpy.ndarray")
        super(DenseLayer, self).__init__()
        self.__weights = weights
        self.__biases = biases
        #stores data for later forward/backward tracking
        self.__input = None
        self.__output = None
        
        self.Forward = self.__forward
        self.Backward = self.__backward
    
    def __forward(self,input):
    if type(input)!=np.ndarray:
        raise ValueError("parameter input is not of type numpy.ndarray")
    pass
    
    def __backward(self, outputGradient, rate):
        if type(outputGradient)!=np.ndarray:
            raise ValueError("parameter outputGradient is not of type numpy.ndarray")
        if type(rate)!=float and type(rate)!=int:
            raise ValueError("parameter rate is not of type int or float")
        pass
    
    @property
    def Weights(self):
        return self.__weights
    
    @property
    def Biases(self):
        return self.__biases
    
    @property
    def Outputs(self):
        return self.__weights.shape[0] # shape = (rows, columns)
    
    @Outputs.setter
    def Outputs(self,value):
        pass
```

:::

:::warning Spoiler
<details>
<summary>klik om de oplossing te bekijken</summary>

```python
self.__input = input
self.__output = np.dot(self.__weights, self.__input)
self.__output = np.add(self.__output, self.__biases)
return self.__output
```

</details>

:::

### testen
Dan kan je in een appart bestand test.py volgende code uitvoeren om te testen of je lagen effectief iets nuttig doen. Hier zal geen nuttig getal uit komen, maar zal je wel laten weten of dat je lagen hun data correct doorgeven en dus werken.
```python
from Neural import *
import Enums

nn = Neural(2)
nn.AddDenseLayer(2)
nn.AddDenseLayer(1)

print(nn.Predict(0,0))
```

## Activation Layer
Zoals eerder besproken bij het perceptron zal ook bij onze DenseLayer een activatiefunctie horen, maar om die functie niet te moeten inbouwen in die klasse zullen we daarvoor nog een apparte klasse SigmoidLayer aanmaken. In de klasse SigmoidLayer worden de wiskundige functie dat die laag uitvoert gedefinieerd, daar wordt ook de afgeleide geschreven. Met deze functies wordt dan een object `ActivationFunction` gebouwd met als parameters de net gedefinieerde functies, en uiteindelijk wordt de constructor van de superklasse opgeroepen met het aantal nodes en de activatiefunctie. Het aanmaken van ActivationFunction en het oproepen van de constructor van de superklasse is al voor jullie geschreven. Voor meer hulp kan je ook kijken in de klasse TanhLayer, deze is namelijk gelijkaardig opgebouwd, maar eigenlijk gebeurt in deze laag niet veel, de functies worden namelijk extern opgeroepen. Door het oproepen van deze functies op een centrale plaats is het dan ook veel makkelijker om nieuwe activatiefuncties aan te maken

:::info basiscode

Plaats je oplossing in de functies `sigmoid` en `sigmoidPrime`.  
Je mag daar dan ook `pass` verwijderen.

Gebruik als bestandsnaam SigmoidLayer.py
```python
import numpy as np
from ActivationLayer import ActivationLayer
from ActivationFunction import ActivationFunction
import math

class SigmoidLayer(ActivationLayer):
    def __init__(self, nodes = 0):
        def sigmoid(x):
            pass
        def sigmoidPrime(x):
            pass
        activation = ActivationFunction(sigmoid, sigmoidPrime)
        super(SigmoidLayer, self).__init__(nodes, activation)
```

:::

:::warning solution
<details>
<summary>klik hier om de oplossing te bekijken</summary>

```python
sigmoid = lambda x: 1/(1+math.e**(-x))
sigmoidPrime = lambda y: sigmoid(y)*(1-sigmoid(y))
activation = ActivationFunction(sigmoid, sigmoidPrime)
super(SigmoidLayer, self).__init__(nodes, activation)
```

</details>

:::

Te testen met volgende code.  
Er wordt verwacht dat een nummer tussen 0 en 1 als resultaat wordt geprint
```python
from Neural import *
import Enums

nn = Neural(2)
nn.AddDenseLayer(2)
nn.AddActivation(Enums.SIGMOID)
nn.AddDenseLayer(1)
nn.AddActivation(Enums.SIGMOID)
print(nn.Predict(0,0))
```

## Leren
Het laatste dat zou moeten gebeuren om een neuraal netwerk werkende te krijgen is natuurlijk om het te laten leren, anders heb je gewoon een groot blok wiskunde dat nergens nuttig voor is.
Omdat voor sommigen de wiskunde voor het volgende stuk wat moeilijk te begrijpen kan zijn krijgen jullie hier al de nodige wiskundige notatie van wat er gebeurt. Er wordt van jullie wel nog gevraagd om zelf de nodige code te scrijven.

$$
\begin{aligned}
weightGradient &= outputGradient \cdot input^T \\
inputGradient &= weights^T \cdot outputGradient \\
weights &= weights - weightGradient \cdot rate \\
biases &= biases - outputGradient \cdot rate
\end{aligned}
$$

Het bovenstaande proces wordt backpropagation genoemd. Dit houdt in dat de fout die het netwerk genereert (bijvoorbeeld het verschil tussen de verwachte output en de gegenereerde output) van achter naar voor door het netwerk wordt gestuurd. en zo berekend kan worden hoe fouten weggewerkt moeten worden. Voor de wiskunde hierboven geschreven geldt dat outputGradient de fout is gegenereerd door deze laag in functie van de output (wiskundig is dit $\frac{\Delta{E}}{\Delta{x}}$); Deze wordt meegegeven aan de functie. Elke laag zal dan ook de fout berekenen van de vorige laag (i.e. inputGradient) en zal die dan op het einde doorgeven aan de laag voorgaand op de huidige laag. 

Om dan nog uit te zoeken welke waarden hoeveel moeten aangepast worden gaan we voor de weights berekenen hoeveel invloed elke input had op elk deel van de outputGradient door deze 2 matrixen te vermenigvuldigen. Later kunnen we die waarden dan gebruiken om de weights een "stap" te laten nemen in de richting van een correctere output. De grootte van die stap wordt bepaald door `rate`, een waarde tussen 0 en 1\.

Voor biases kunnen we hetzelfde proces gebruiken maar omdat de bias een directe invloed heeft op de output kunnen we daar meteen outputGradient vermenigvuldigen met rate om een stap te nemen.

:::note
Plaats jouw oplossing in de functie `__backend` van DenseLayer
:::

:::warning solution

<details>
<summary>klik hier om de oplossing te bekijken</summary>

```python
weightGradient = np.dot(outputGradient,np.transpose(self.__input))
inputGradient = np.dot(np.transpose(self.__weights), outputGradient)
self.__weights = np.subtract(self.__weights, weightGradient*rate)
self.__biases = np.subtract(self.__biases, outputGradient*rate)
return inputGradient
```

</details>

:::

## einde
Meegeleverd is Program.py, en al de andere uitgewerkte klassen, als alles goed is gegaan zou je bij het uitvoeren iets gelijkaardig als de volgende afbeeldingen moeten krijgen  

![witte strook](/img/white.png) ![zwarte strook](/img/black.png)

:::caution
Soms kan het ook dat je een grijze vlek krijgt zoals in volgende foto, daar hoef je je geen druk om te maken. Dit is omdat bij het zoeken naar een (lokaal) minimum van de fout bij het afleiden dat in een slecht dal is gekomen en daar niet meer uit kan. Probeer je programma nog eens uit te voeren, mogelijks krijg je dan een beter resultaat. Het kan zijn dat je meerdere keren zal moeten proberen.

![grijze vlek](/img/grey.png)

:::