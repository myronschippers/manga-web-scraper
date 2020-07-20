import React, { useState } from 'react';

// CUSTOM COMPONENTS
import PageLayout from '../PageLayout/PageLayout';
import SearchField from '../../SearchField/SearchField';
import SearchResultsList from '../../SearchResultsList/SearchResultsList';
import Panel from '../../Panel/Panel';

function SearchResults (props) {
  return (
    <PageLayout hdgText="Search Results">
      <Panel>
        <div>
          <SearchField />
        </div>

        <SearchResultsList />
      </Panel>
    </PageLayout>
  );
}

export default SearchResults;
