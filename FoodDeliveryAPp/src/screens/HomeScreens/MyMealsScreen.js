import React from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity } from "react-native";
import { colors, parameters, title } from "../../constants/styles";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SCREEN_NAMES } from "../../constants/navigation";
import { Screen } from "../../components/layout/Screen";
//import Card from 'react-bootstrap/Card';

export function MyMealsScreen() {
    /*fetch('https://api.spoonacular.com/recipes/random?apiKey=ccc7636d8ca643b3aeaa0428a3e1efe9&number=3')
    .then((response) => response.json())
    .then((data) => console.log(data));
    

    // Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('https://api.spoonacular.com/recipes/random?apiKey=ccc7636d8ca643b3aeaa0428a3e1efe9&number=3', { answer: 42 })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });*/

    let dataGlobal;

    const getData = async () => {
        const response = await fetch("https://api.spoonacular.com/recipes/random?apiKey=ccc7636d8ca643b3aeaa0428a3e1efe9&number=3");
        const data = await response.json();
        dataGlobal = data;
        return data;
    };

    (async () => {
        await getData();
        console.log(dataGlobal);
    })();

    return (
        <SafeAreaView style={{
            flex:1, 
            flexDirection:'column', 
            alignItems: 'center',
            justifyContent: 'space-around'
            }}
        >
            {/*<div>
            {data.map( displayMeals => {
                return(
                    <div className="box" key={ displayMeals.id }>
                        { displayMeals.title }
                    </div>
                );
            })}
            </div>

            <div>
                {data.map((name, id) => (
                    <div key={index}>
                        <h2>{name.title}</h2>
                    </div>
                ))}
            </div>*/}

            <TouchableOpacity style={{backgroundColor: "dodgerblue", width: '80%', height: '30%', 
                    flexdirection:'column', alignItems:'center', justifyContent:'center' }}>
                <Text>Meal 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: "gold", width: '80%', height: '30%',
                    flexdirection:'column', alignItems:'center', justifyContent:'center' }}>
                <Text>Meal 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: "orange", width: '80%', height: '30%',
                    flexdirection:'column', alignItems:'center', justifyContent:'center' }}>
                <Text>Meal 3</Text>
            </TouchableOpacity>
            {/*<Text>No Meals to Display</Text>*/}
            <Button style={{width:'50%', height:'10%'}} title="Generate New Meals" color="blue" onPress={()=> alert('Generating Meals')}></Button>
        </SafeAreaView>
    )
}

/*function TextExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default TextExample;*/

const styles = StyleSheet.create({
    button: {
        backgroundColor: "red"
    }
})