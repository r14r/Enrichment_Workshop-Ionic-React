import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';

import { useTeaContext } from '../hooks/useTeaContext';
import { TeaCategory } from '../models/TeaCategory';
import TeaCategoryItem, { renderSkeletonList } from './TeaCategoryItem';

import './TeaCategories.css';

const TeaCategories: React.FC = () => {
  const { isReady, categories } = useTeaContext();
  const skeletonArray = Array.from(Array(3).keys());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tea Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tea Categories</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/categories/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        {!isReady && renderSkeletonList(skeletonArray)}
        {isReady && categories.length > 0 && (
          <IonList>
            {categories.map((cat: TeaCategory) => (
              <TeaCategoryItem key={cat.id} category={cat} />
            ))}
          </IonList>
        )}
        {isReady && !categories.length && (
          <div className="tea-categories-list--empty">
            <div className="container">
              <h1>No Categories Found</h1>
              <p>Tap the button below to add a tea category to the list!</p>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TeaCategories;
