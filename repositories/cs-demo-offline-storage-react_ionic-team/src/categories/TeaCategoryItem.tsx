import {
  IonItem,
  IonLabel,
  IonSkeletonText,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonList
} from '@ionic/react';
import React from 'react';

import { TeaCategory } from '../models/TeaCategory';
import { useTeaContext } from '../hooks/useTeaContext';

import './TeaCategoryItem.css';

const TeaCategoryItem: React.FC<{ category: TeaCategory }> = ({ category: { name, description, id } }) => {
  const { deleteTeaCategory } = useTeaContext();

  return (
    <IonItemSliding className="tea-category-item">
      <IonItem routerLink={`/categories/${id}`}>
        <IonLabel>
          <div className="name">{name}</div>
          <div className="description">{description}</div>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="danger" onClick={() => deleteTeaCategory(id)}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
export default TeaCategoryItem;

export const renderSkeletonList = (arr: number[]) => (
  <IonList>
    {arr.map((_, idx) => (
      <IonItem key={idx}>
        <IonLabel className="skeleton-category-item">
          <IonSkeletonText animated={true} className="name line" />
          <IonSkeletonText animated={true} className="line" />
          <IonSkeletonText animated={true} className="line" />
        </IonLabel>
      </IonItem>
    ))}
  </IonList>
);
