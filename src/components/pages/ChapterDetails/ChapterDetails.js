import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import PageLayout from '../PageLayout/PageLayout';

class ChapterDetails extends Component {
  componentDidMount() {
    console.log('MOUNTED, Chapter Details');
  }

  render() {
    const chapterHdg = this.props.store.chapterDetails.name || 'Chapter Details';

    return (
      <PageLayout hdgText={chapterHdg}>
        <div>
          PAGES LISTED for CHAPTER
        </div>
        <div>
          <button>Previous</button>
          <button>Next</button>
        </div>
      </PageLayout>
    );
  }
}

export default connect(mapStoreToProps('chapterDetails'))(ChapterDetails);