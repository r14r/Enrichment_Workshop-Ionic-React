import React, { Component } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import { IonRange, IonIcon, IonSelect, IonSelectOption, IonCard, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButtons, IonButton, IonPage, IonFooter, IonBadge} from '@ionic/react';
import { createOutline, expandOutline } from 'ionicons/icons';
import './playx.css'
export class Playx extends Component {

  bg = new window.Image()
  state = {
    textTitle: {
    textEditVisible: false,
    textX: 10,
    textY: 10,
    textValue: "Hello",
    fontStyle: "normal",
    align: "center",
    id: 0,
    sizeValue: 96,
    colorValue: "black"
  },
    bg: {
      src: 'https://sacrebleu-galerie.com/wp-content/uploads/2018/06/clean-white-brick-wall-textures-plain.jpg'
    },
    canvas: {
      size: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    }
  };

     updateWindowSize() {
       console.log(window.innerHeight)
       let canvas = this.state.canvas
       let textTitle = this.state.textTitle
       canvas.size = { height: window.innerHeight, width: window.innerWidth}
       textTitle.textX = 10
       textTitle.textY = 10
       this.setState({
         canvas: canvas,
         textTitle: textTitle,
       })
     }
  
  handleTextareaKeyDown = (e: any) => {
    if (e.keyCode === 13) {
          let {textTitle} = this.state;

      textTitle.textEditVisible = false;
      this.setState({
          textTitle
        });
    }
  };

  handleCloseButton = () => {
          let {textTitle} = this.state;
    textTitle.textEditVisible = false;
    this.setState({
          textTitle
        });
  };

  handleTextEdit = (e: any) => {
          let {textTitle} = this.state;
    textTitle.textValue = e.target.value;
    this.setState({
          textTitle
        });
  };

  handleSizeEdit = (e: any) => {
          let {textTitle} = this.state;
    textTitle.sizeValue = e.target.value;
    this.setState({
          textTitle
        });
  };

  handleColorEdit = (e: any) => {
          let {textTitle} = this.state;
    textTitle.colorValue = e.target.value;
    this.setState({
          textTitle
        });
  };
  handleTextClick = () => {
    let position = {x: 10 , y: 10}
    let { textTitle} = this.state;
    if (!textTitle.textEditVisible) {
      textTitle.textEditVisible = true;
    } else {
      textTitle.textEditVisible = false;
    }
    textTitle.textX = position.x;
    textTitle.textY = position.y;
    this.setState({
          textTitle
        })
  };
  render() {
          this.bg.src = this.state.bg.src;
    return (
        <IonPage>
          <Stage width={this.state.canvas.size.width} height={this.state.canvas.size.height} scaleX={1} scaleY={1}>
            <Layer>
              <Image width={this.state.canvas.size.width} height={this.state.canvas.size.height} image={this.bg} />
              <Text
                fontSize={this.state.textTitle.sizeValue}
                draggable
                text={this.state.textTitle.textValue}
                shadowColor={this.state.textTitle.colorValue}
                shadowBlur={20}
                shadowOpacity={0.8}
                opacity={0.6}
                x={this.state.textTitle.textX}
                y={this.state.textTitle.textY}
                wrap="word"
                fill={this.state.textTitle.colorValue}
                onClick={ () => this.handleTextClick()}
              />
            </Layer>
          </Stage>

          <IonHeader>
        <IonToolbar>
          <IonTitle>PlayX Demo</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={()=> {this.handleTextClick()}} color="danger">
              <IonIcon class="pointer" slot="end" icon={createOutline} />
            </IonButton>
            <IonButton onClick={()=> {this.updateWindowSize()}} color="danger">
              <IonIcon class="pointer" slot="end" icon={expandOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

          <IonCard
            style={{
              display: this.state.textTitle.textEditVisible ? "block" : "none",
              position: "fixed",
              bottom: "10vh",
            }}
          >
            <IonItem>
              <IonLabel position="fixed">Title</IonLabel>
              <IonInput
                value={this.state.textTitle.textValue}
                onIonChange={e => this.handleTextEdit(e)}
                onKeyDown={e => this.handleTextareaKeyDown(e)}
                placeholder="Title"
              >
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">Font Size</IonLabel>
              <IonRange
                value={this.state.textTitle.sizeValue}
                min={64}
                max={250}
                onIonChange={e => this.handleSizeEdit(e)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">Color</IonLabel>
              <IonSelect
                value={this.state.textTitle.colorValue}
                onIonChange={e => this.handleColorEdit(e)}>
                <IonSelectOption value="black">Black</IonSelectOption>
                <IonSelectOption value="green">Green</IonSelectOption>
                <IonSelectOption value="red">Red</IonSelectOption>
                <IonSelectOption value="blue">Blue</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonButton
                color="danger"
                expand="block"
                onClick={() => this.handleCloseButton()}
              >
                Close
          </IonButton>
            </IonItem>
          </IonCard>
          <IonFooter 
            style={{
              width: this.state.canvas.size.width,
              display: "block",
              position: "fixed",
              bottom: 0
            } }
          onClick={() => this.handleTextClick()}>
            <IonItem>
              <IonBadge slot="start">{this.state.textTitle.textValue}</IonBadge>
              <IonBadge slot="end">Height: {this.state.textTitle.sizeValue} x Width: {this.state.textTitle.sizeValue}</IonBadge>
            </IonItem>
          </IonFooter>
        </IonPage>
    );
  }
}