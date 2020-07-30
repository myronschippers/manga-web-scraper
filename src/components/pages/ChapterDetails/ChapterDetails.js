import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import PageLayout from '../PageLayout/PageLayout';
import { Button } from '@material-ui/core';

class ChapterDetails extends Component {
  componentDidMount() {
    console.log('MOUNTED, Chapter Details');
    if (this.props.match.params.id !== this.props.store.chapterDetails.id) {
      this.props.dispatch({
        type: 'API_FETCH_CHAPTER_PAGES',
        payload: {
          chapterId: this.props.match.params.id
        },
      });
    }
  }

  handleClickRefreshPages = () => {
    this.props.dispatch({
      type: 'API_REFRESH_CHAPTER_PAGES',
      payload: this.props.store.chapterDetails,
    });
  }

  render() {
    const chapterHdg = this.props.store.chapterDetails.name || 'Chapter Details';
    const pagesListFOrDisplay = this.props.store.chapterDetails.pages.map((item, index) => {
      return (
        <div key={index}>
          <img
            src={item.img_src}
            alt={`${this.props.store.chapterDetails.name} - page #${item.sequence}`}
          />
        </div>
      );
    });

    return (
      <PageLayout hdgText={chapterHdg}>
        <div>
          {this.props.store.chapterDetails.pages.length === 0 &&
            <Button onCLick={this.handleClickRefreshPages}>Refresh Pages</Button>
          }
          {pagesListFOrDisplay}
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