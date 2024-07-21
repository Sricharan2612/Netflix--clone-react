import React, { useEffect, useState } from 'react';
import './Plans.css';
//Pages and Components
import Loader from '../../components/Loader/Loader';
//Firebase
import db from '../../firebase';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
//Redux
import { useSelector } from 'react-redux';
//Stripe
import { loadStripe } from '@stripe/stripe-js';


const Plans = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector(data => data.user);
  const [subscription, setSubscription] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getSubData = async () => {
      setLoader(true);
      const customerRef = collection(db, 'customers');
      const customerDocData = doc(customerRef, user.uid);
      const subscriptionRef = collection(customerDocData, 'subscriptions');
      const snap = await getDocs(subscriptionRef);
      snap.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start: subscription.data().current_period_start.seconds,
        });
      });
      setLoader(false);
    };
    getSubData();
  }, [user.uid]);

  //For getting data of products and users
  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const products = {};
      //For accessing products collection 
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("active", "==", true));
      const productSnapshot = await getDocs(q);
      productSnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        //For accessing prices collection 
        const prodDocRef = doc(productsRef, productDoc.id);
        const priceRef = collection(prodDocRef, 'prices');
        const priceSnapshot = await getDocs(priceRef);
        priceSnapshot.forEach(price => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data()
          };
        });
      });
      setProducts(products);
      setLoader(false);
    };
    getData();
  }, []);

  const loadCheckout = async (priceId) => {
    setLoader(true);
    const customerRef = collection(db, 'customers');
    const userDocRef = doc(customerRef, user.uid);
    const docRef = await addDoc(collection(userDocRef, 'checkout_sessions'), {
      price: priceId,
      success_url: 'http://localhost:3000/homepage',
      cancel_url: 'http://localhost:3000/homepage'
    });
    const onsub = onSnapshot(docRef, async (doc) => {
      const { error, sessionId } = doc.data();

      if (error) {
        //Show error function
        //Inspect cloud function logs in the  firebase console
        alert(`An error occured:${error.message}`);
      }

      if (sessionId) {
        //We have a session, let's redirect to checkout
        //Init Stripe
        setLoader(true);
        const stripe = await loadStripe("pk_test_51Pciv1Rv54ptdD6sVDUSG2sYOVEb0wyLGeOWlg0EXwZDMYsjeUtFGb6td9GAJGLUDrnwmRrMIuWDmffpr2DJZlSo00tPrbSxfB");
        stripe.redirectToCheckout({ sessionId });
        setLoader(false);
      }

    });
    setLoader(false);
  };
  // console.log(Object.entries(products));
  console.log(subscription);
  return (
    <div className='plans'>
      {loader && <Loader />}
      <br />
      {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
      {Object.entries(products).map(([productId, productData]) => {
        //Logic to check if the users sunscription is active...
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
        return (
          <div key={productId} className={`${isCurrentPackage && 'plan_disabled'} plan`}>
            <div className="plan_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? 'Current Package' : 'Subscribe'}</button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
