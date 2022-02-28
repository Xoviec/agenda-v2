import styles      from '../../../styles/Meet.module.css';
import sharedStyles from '../../../styles/Shared.module.css';

import LoadingIcon    from '../../../components/LoadingIcon';
import DiscussionForm from '../../../components/Bundles/Meeting/DiscussionForm';

import { useEffect, useState } from 'react';

import { fetchMeeting } from '../../../store/features/meetings/meetingSlice';

const Meet = ( props ) => {
  const [ takeaways, setTakeaways ]     = useState([]);
  const [ loading, setLoading ]         = useState( true );
  const [ meeting, setMeeting ]         = useState({});
  const [ savingTopic, setSavingTopic ] = useState( false );

  useEffect( () => {
    const loadMeeting = async() => {
      const meeting_id = String( window.location.pathname ).split('/')[ 2 ];

      await props.store.dispatch( fetchMeeting( meeting_id ) );

      const { meetings: { openMeeting } } = props.store.getState();

      setMeeting({
        ...openMeeting,
        topics: openMeeting.topics.map( topic => {
          return {
            ...topic,
            discussed: false
          };
        })
      });

      setLoading( false );
    };

    loadMeeting();
  }, [ props.store ] );

  useEffect( () => {
    const saveTopic = async() => {
      setSavingTopic( false );
    };

    if ( savingTopic ) {
      saveTopic();
    }
  });

  const addTakeaway = ( takeaway ) => {
    setTakeaways([ ...takeaways, takeaway ]);
  };

  if ( loading ) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingIcon />
      </div>
    );
  }

  const sorted = meeting.topics.sort( ( a, b ) => {
    return a.name[ 0 ].toLowerCase() - b.name[ 0 ].toLowerCase();
  });


  const splitIndex = sorted.findIndex( topic => {
    return topic.discussed === false;
  });

  const discussedTopics = sorted.slice( 0, splitIndex ).map( topic => {
    return (
      <div className={sharedStyles.card} key={ topic.name }>
        {topic.name}
      </div>
    );
  });

  const unDiscussedTopics = sorted.slice( splitIndex + 1 ).map( topic => {
    return (
      <div className={sharedStyles.card} key={ topic.name }>
        {topic.name}
      </div>
    );
  });

  const discussionForm = <DiscussionForm
    title={sorted[ splitIndex ].name}
    addTakeaway={addTakeaway}
  />;

  const takeawayCards = takeaways.map( chip =>
    <div className={sharedStyles.card} key={chip}>{chip}</div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.sideContainer}>
        { unDiscussedTopics }
      </div>
      <div className={styles.mainContainer}>
        { discussionForm }
        { takeawayCards }
      </div>
      <div className={styles.sideContainer}>
        { discussedTopics }
      </div>
    </div>
  );
};

module.exports = Meet;
