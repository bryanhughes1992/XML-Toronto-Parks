window.addEventListener("load", function() {
  //Create a new XML HTTP Request
  var xml = new XMLHttpRequest();
  //Create a placeholder variable for the XML Document
  var xmlDocument;

  //Request to open the file
  xml.open("POST", "toronto-parks.xml");
  //Return the response as a DOM tree
  xml.responseType = "document";
  //Send the request
  xml.send();

  //When the XML DOM loads, fire this function
  xml.onload = function() {
    xmlDocument = xml.responseXML;
    generateDropdown();
  }


  function generateDropdown() {
    //Capture the Location XML Element as a variable
    var locations = xmlDocument.getElementsByTagName("Location");
    //Declare an empty string to hold the option data
    var option = "";
    //For every Location element in the Locations root element
    for(let location of locations) {
      //The option's text will be equal to the text content of the first LocationName in the HTML list
      var optionText = location.getElementsByTagName("LocationName")[0].textContent;
      //The option's value will be equal to the text content of the first LocationID in the HTML list
      var optionValue = location.getElementsByTagName("LocationID")[0].textContent;
      //Set the HTML and inner text contents of the option tag
      option += `<option value='${optionValue}'>${optionText}</option>`;
    }
    //Capture the dropdown in the HTML
    var dropdown = document.getElementById('dropdown');
    //Set the dropdowns innerHTML to be the contents of 'option'
    dropdown.innerHTML = option;
  }

  //When the 'detailsBtn' button is clicked, fire this function
  document.getElementById("detailsBtn").addEventListener("click", function() {
    //Capture the outMsg area in the HTML
    var outMsg = document.getElementById("outMsg");
    //While the outMsg has nested children
    while(outMsg.hasChildNodes()){
      //Remove first child of outMsg (The last selected data, or the data to be replaced)
      outMsg.removeChild(outMsg.firstChild);
    }
    //Capture the dropdown as a variable
    var dropdown = document.getElementById("dropdown");
    //The locationId is equal to the value of the selected option
    var locationId = dropdown.options[dropdown.selectedIndex].value;

    var location = xmlDocument.evaluate(`//Location[LocationID='${locationId}']`, xmlDocument, null, XPathResult.ANY_TYPE, null);

    location = location.iterateNext();
    //Capture the text content of the first LocationName
    var locationName = location.getElementsByTagName("LocationName")[0].textContent;
    //Capture the text content of the first Address
    var address = location.getElementsByTagName("Address")[0].textContent;

    //Insert an h1 element into the DOM
    var nameHeader = document.createElement("h1");
    //Set the contents of the h1 to be the locationName
    nameHeader.innerText = locationName;
    //Insert a paragraph element
    var addressP = document.createElement("p");
    //Create an interpolated string with the address nested within
    var addressPText = `Location: ${address}`;
    //Set the inner text of the paragraph to be the addressPText
    addressP.innerText = addressPText;

    //Capture all the elements named Facility
    var facilities = location.getElementsByTagName("Facility");
    //Create an unordered list element
    var ul = document.createElement("ul");

    //For each Facility element in the parent/root element facilities
    for(let facility of facilities) {
      //Create a list node
      var liNode = document.createElement("li");
      //Set the inner text of li's to be the text content of the first FacilityDisplayName
      liNode.innerText = facility.getElementsByTagName("FacilityDisplayName")[0].textContent;
      //Append each liNode to the ul
      ul.appendChild(liNode);
    }
    //Append the Name, address, and list of facilities to the outMsg area in the html
    outMsg.appendChild(nameHeader);
    outMsg.appendChild(addressP);
    outMsg.appendChild(ul);
  });
});