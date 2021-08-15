import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import Head from "next/head";
import {Fragment} from "react";

const HomePage = (props) => {

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="This is the search engine result text"/>
      </Head>
      <MeetupList meetups={props.meetups}/>
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from an api

  const client = await MongoClient.connect('mongodb+srv://dillon:Divido2021@cluster0.6t92t.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map(meetup => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          address: meetup.address,
          image: meetup.image
        }
      })
    },
    revalidate: 10
  };
};

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const res = context.res;
//
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// };

export default HomePage;