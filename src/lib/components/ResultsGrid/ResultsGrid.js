/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Overridable from 'react-overridable';
import { Card, Image } from 'semantic-ui-react';
import { AppContext } from '../ReactSearchKit';
import { ShouldRender } from '../ShouldRender';

function ResultsGrid({
  loading,
  totalResults,
  results,
  resultsPerRow,
  overridableId,
}) {
  return (
    <ShouldRender condition={!loading && totalResults > 0}>
      <Element
        results={results}
        resultsPerRow={resultsPerRow}
        overridableId={overridableId}
      />
    </ShouldRender>
  );
}

ResultsGrid.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  resultsPerRow: PropTypes.number,
  overridableId: PropTypes.string,
};

ResultsGrid.defaultProps = {
  resultsPerRow: 3,
  overridableId: '',
};

const GridItem = ({ result, index, overridableId }) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable
      id={buildUID('ResultsGrid.item', overridableId)}
      result={result}
      index={index}
    >
      <Card fluid key={index} href={`#${result.id}`}>
        <Image src={result.imgSrc || 'http://placehold.it/200'} />
        <Card.Content>
          <Card.Header>{result.title}</Card.Header>
          <Card.Description>{result.description}</Card.Description>
        </Card.Content>
      </Card>
    </Overridable>
  );
};

const Element = ({ overridableId, ...props }) => {
  const { results, resultsPerRow } = props;
  const { buildUID } = useContext(AppContext);

  const _results = results.map((result, index) => (
    <GridItem
      key={index}
      result={result}
      index={index}
      overridableId={overridableId}
    />
  ));

  return (
    <Overridable
      id={buildUID('ResultsGrid.container', overridableId)}
      {...props}
    >
      <Card.Group itemsPerRow={resultsPerRow}>{_results}</Card.Group>
    </Overridable>
  );
};

export default Overridable.component('ResultsGrid', ResultsGrid);
