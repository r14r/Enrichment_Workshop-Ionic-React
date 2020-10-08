import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
        IonCard, IonCardContent, IonLabel, IonInput, IonItem, 
        IonButton, IonChip, IonImg, IonThumbnail, IonGrid, IonRow,
        IonCol, IonIcon } from '@ionic/react';
import React from 'react';
import './Bmi.css';

export class Bmi extends React.Component<{}, any> {

    constructor(props: any){
        super(props);
        this.state = {
            height: "",
            weight: "",
            bmi: "",
            chipColor: "",
            chipText: "x"
        }
    }

    calculateBMI() {    
        let { weight, height } = this.state;

        let txt, color = ''
        let bmiRes;

        bmiRes = ((weight / height) / height).toFixed(2);

        if ( bmiRes < 18.5 ) {

            color = "warning";
            txt = "Skinny";

        } else if (bmiRes >= 18.5 && bmiRes < 24.9 ) {

            color = "success";
            txt = "Okay";

        } else if (bmiRes > 25 && bmiRes < 29.9 ) {

            color = "warning";
            txt = "Chubby";

        } else {

            color = "danger";
            txt = "Obese";

        }
        
        this.setState({
            bmi: bmiRes,
            chipColor: color,
            chipText: txt
        })
        
    };

    render() {
        let { height, weight, bmi, chipColor, chipText } = this.state;

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonIcon icon="calculator" />
                        <IonTitle slot="start"><b>BMI Calculator</b></IonTitle>
                        <IonThumbnail slot="end">
                            <IonImg src="assets/fat_bloke.png"/>
                        </IonThumbnail>
                    </IonToolbar>
                </IonHeader>
                <IonContent color="light">
                    <IonGrid>
                        <IonRow>
                          <IonCol></IonCol>
                          <IonCol></IonCol>
                        </IonRow>
                        <IonRow >
                            <IonCol size="0.25"></IonCol>
                            <IonCol size="11.5">
                                <IonCard>                                
                                    <IonCardContent>                            
                                        <IonItem lines="none">
                                            <IonLabel position="floating">Height (m)</IonLabel>
                                            <IonInput min="0" type="number" value={height}  onIonChange={(e: any) => this.setState({ height: e.detail.value})} required inputmode="numeric"></IonInput>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel position="floating">Weight (kg)</IonLabel>
                                            <IonInput min="0" type="number" value={weight} onIonChange={(e: any) => this.setState({ weight: e.detail.value})} required inputmode="numeric"></IonInput>
                                        </IonItem>         
                                        <IonButton expand="block" color="primary" onClick={() => this.calculateBMI()}><b>Calculate</b></IonButton>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="0.25"></IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size="0.25"></IonCol>
                          <IonCol size="11.5">
                            <IonCard>
                                <IonCardContent>
                                    <IonItem lines="none">
                                        <IonLabel>BMI: <b>{bmi}</b></IonLabel>
                                        <IonChip color={chipColor}>
                                            <IonLabel><b>{chipText}</b></IonLabel>
                                        </IonChip>                                                       
                                    </IonItem>                    
                                </IonCardContent>
                            </IonCard>  
                          </IonCol>
                          <IonCol size="0.25"></IonCol>
                        </IonRow>
                    </IonGrid>    
                    
                     
                </IonContent>
            </IonPage>    
        );
    }
};

export default Bmi;