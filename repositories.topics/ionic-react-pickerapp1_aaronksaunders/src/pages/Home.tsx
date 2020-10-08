import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel
} from "@ionic/react";
import React, { useState } from "react";
import "./Home.css";
import MyPicker from "../components/MyPicker";

export interface ISessionTime {
  weekday: string;
  period: string;
}

const Home: React.FC = () => {
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [sessionTime, setSessionTime] = useState<ISessionTime | undefined>(
    undefined
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic React</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader>
          <IonToolbar title="condense">
            <IonLabel>Picker Sample</IonLabel>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonButton
            onClick={() => {
              setPickerIsOpen(true);
            }}
          >
            Select Session
          </IonButton>
          <IonButton
            onClick={() => {
              setSessionTime(undefined);
            }}
          >
            Clear Session
          </IonButton>
        </IonItem>
        <IonItem
          onClick={() => {
            setPickerIsOpen(true);
          }}
        >
          {sessionTime ? (
            <IonLabel>
              {sessionTime?.weekday} - {sessionTime?.period}
            </IonLabel>
          ) : (
            <IonLabel className="placeHolder">Please Select Session</IonLabel>
          )}
        </IonItem>
        <MyPicker
          isOpen={pickerIsOpen}
          onCancel={() => {
            setPickerIsOpen(false);
          }}
          onSave={(_value: any) => {
            console.log(_value);
            let { Day, SessionTime } = _value;
            setSessionTime({ weekday: Day.value, period: SessionTime.value });
            setPickerIsOpen(false);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
