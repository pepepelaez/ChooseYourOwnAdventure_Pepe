import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var pages = {
  start: {
    content:
      "Welcome, traveler! Are you ready for your adventure? My name is Sven of the North and who are you?",
    image1: "AdventureStart.jpg",
    label1: "I don't have a name",
    label2: "Present Myself",
    page1: "weapons",
    page2: "named"
  },
  weapons: {
    content: "This adventure will be dangerous, please select a weapon",
    image2: "Weaponshop.jpg",
    input: {
      type: "select",
      values: ["", "Sword", "Bow", "Spear", "Magic Staff", "Daggers", "Hammer"],
      saveKey: "weapon: "
    },
    label1: "Next",
    page1: "beginning"
  },
  named: {
    content: "Tell us your name, we promise not to forget about it",
    input: {
      type: "text",
      saveKey: "Name: "
    },
    label1: "Next",
    page1: "weapons"
  },
  beginning: {
    content:
      "Your mission starts here! You'll have to defeat a Dragon, but first go to the castle",
    label1: "Yes! Start the trail",
    label2: "Ugh, I quit",
    page1: "trailPart1",
    page2: "quit"
  },
  trailPart1: {
    content: "On your way to the castle, you see an elve laying on the ground",
    label1: "Help the Elve",
    label2: "Leave there",
    page1: "helper",
    page2: "trailPart2"
  },
  quit: {
    content: "You have refused to do the mission, refresh to try again."
  },
  helper: {
    content:
      "You have helped the eleve and now he will join your cause to defeat the dragon!",
    label1: "Make your way to the castle together",
    label2: "Refuse help from elve",
    page1: "trailPart2",
    page2: "refuser"
  },
  trailPart2: {
    content:
      "You make your way safe to the end of the trail, you are in front of the castle",
    label1: "Enter from the front door",
    label2: "Sneak in from the back",
    page1: "door",
    page2: "back"
  },
  refuser: {
    content: "The elve gets furious at you, and grabs a knife from his back",
    label1: "Attack!",
    label2: "Defend",
    page1: "attackElve",
    page2: "elveDeath"
  },
  door: {
    content: "A huge dragon appears in front of you!! and spits fire!",
    label1: "Attack!",
    label2: "Dodge!",
    page1: "death",
    page2: "win"
  },
  back: {
    content:
      "You've sneaked through a window and see a huge dragon, but he has not noticed you. You can only see the scales in his back",
    label1: "Attack!",
    label2: "Find a better spot",
    page1: "death",
    page2: "newSpot"
  },
  attackElve: {
    content: "You attacked the elve and killed him, that was a close one",
    label1: "Continue to the castle",
    label2: "I'm done, I quit",
    page1: "trailPart2",
    page2: "quit"
  },
  elveDeath: {
    content:
      "You tried to defend yourself, but his knife cuts right through you. You should have brough a shield! Refresh to try again."
  },
  death: {
    content:
      "The dragon has killed you, his scales are too thick, his fire is too fast and your moves not enough. Refresh to try again."
  },
  win: {
    content:
      "You hit the dragon right on his heart, killing him once and for all. You have won the challenge!! congratulations!"
  },
  newSpot: {
    content:
      "You have sneaked right under his chest, but he notice you at any moment",
    label1: "Attack!",
    label2: "wait",
    page1: "win",
    page2: "death"
  }
};

class Page extends Component {
  render() {
    var pageData = pages[this.props.pageName];
    if (!pageData) {
      throw new Error("Eek! No page here!");
    }

    var goToPage = this.props.goToPage;
    var saveUserData = this.props.saveUserData;
    //var useUserData = this.props.useUserData;

    function goToPage1() {
      goToPage(pageData.page1);
    }
    function goToPage2() {
      goToPage(pageData.page2);
    }
    function handleChange(event) {
      saveUserData(pageData.input.saveKey, event.target.value);
    }

    var compliment;
    if (pageData.input) {
      if (event.target.value !== "") {
        compliment = <p>Nice!!</p>;
      }
    }

    var image1 = "";
    if (pageData.image1) {
      image1 = (
        <div>
          <img className="main-page-image" src={pageData.image1} />
        </div>
      );
    }
    var image2 = "";
    if (pageData.image2) {
      image2 = (
        <div>
          <img className="weapons" src={pageData.image2} />
        </div>
      );
    }
    var weaponArt = "";
    if (event.target.value == "Sword") {
      weaponArt = (
        <div>
          <img className="sword" src="sword.jpg" />
        </div>
      );
    } else if (event.target.value == "Bow") {
      weaponArt = (
        <div>
          <img className="bow" src="Bow.jpg" />
        </div>
      );
    } else if (event.target.value == "Spear") {
      weaponArt = (
        <div>
          <img className="spear" src="spear.jpg" />
        </div>
      );
    } else if (event.target.value == "Magic Staff") {
      weaponArt = (
        <div>
          <img className="magicstaff" src="magic.jpg" />
        </div>
      );
    } else if (event.target.value == "Daggers") {
      weaponArt = (
        <div>
          <img className="daggers" src="daggers.jpg" />
        </div>
      );
    } else if (event.target.value == "Hammer") {
      weaponArt = (
        <div>
          <img className="hammer" src="Hammer.jpg" />
        </div>
      );
    }

    var userInfo = "";
    if (pageData.input) {
      userInfo = <p>{pageData.input.saveKey + event.target.value}</p>;
    }

    var button1 = "";
    if (pageData.page1) {
      button1 = <button onClick={goToPage1}>{pageData.label1}</button>;
    }
    var button2 = "";
    if (pageData.page2) {
      button2 = <button onClick={goToPage2}>{pageData.label2}</button>;
    }

    var input = "";
    if (pageData.input) {
      var inputData = pageData.input;
      if (inputData.type == "select") {
        input = (
          <p>
            <select
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            >
              {inputData.values.map(v => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </p>
        );
      } else if (inputData.type == "text") {
        input = (
          <p>
            <input
              type="text"
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            />
          </p>
        );
      }
    }

    return (
      <div>
        <p className="main-text">{pageData.content}</p>
        {input}
        {image1}
        {image2}
        {button1}
        {button2}
        {compliment}
        <p className="adventureInfo">Adventure Info:</p>
        {userInfo}
        {weaponArt}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "start",
      userData: {}
    };

    this.goToPage = this.goToPage.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    //this.useUserData = this.useUserData.bind(this);
  }

  goToPage(pageName) {
    this.setState({
      page: pageName
    });
  }

  // useUserData(key, value) {

  saveUserData(key, value) {
    function updateState(state) {
      var newState = { userData: { ...state.userData, [key]: value } };
      return newState;
    }
    this.setState(updateState);
  }

  render() {
    return (
      <div className="App">
        <Page
          pageName={this.state.page}
          goToPage={this.goToPage}
          userData={this.state.userData}
          saveUserData={this.saveUserData}
          //useUserData={this.useUserData}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

//
