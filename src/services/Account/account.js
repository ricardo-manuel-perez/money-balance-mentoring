import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { query, where, updateDoc, doc } from "firebase/firestore";


const accountsRef = collection(db, 'ACCOUNTS');

export async function postAccount(accountData) {
    try {
        const newAccountData = await addDoc(
            accountsRef,
            accountData
        );
        return newAccountData;
    } catch (error) {
        console.error(error);
    }
}

export function getAccountsQuery(userUid) {
    return query(
        accountsRef,
        where("uid", "==", userUid)
    );
}

export async function updateAccount(id, updatedAccountData) {
    try {
        const selected = doc(db, "ACCOUNTS", id);
        const updatedAccount =  await updateDoc(selected, updatedAccountData);
        return updatedAccount;
    } catch (error) {
        console.error(error);
    }
}

export async function getAccountQuery(accountiId) {
    let docu = doc(db, "ACCOUNTS", accountiId);
    return await getDoc(docu);
}