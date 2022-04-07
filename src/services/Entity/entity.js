import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../utils/Auth/use-auth';

export const UseGetEntity = (entityQuery, customCall = null) => {
    const auth = useAuth();
    const [entitiesState, setEntitiesState] = useState([]);
    useEffect(() => {
        if (auth.data && !auth.isLoading) {
            const unsubscribe = onSnapshot(entityQuery, (querySnapshot) => {
                const entities = [];
                querySnapshot.forEach((doc) => {
                    entities.push({ ...doc.data(), id: doc.id });
                });
                setEntitiesState(entities);
            });
            return () => unsubscribe();
        }
    },[customCall]);
    return entitiesState;
}