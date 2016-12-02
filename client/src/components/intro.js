import React, { Component } from 'react';
import {Row,Collection,Col,CollectionItem} from 'react-materialize';

class Intro extends Component {  
  render() {
    return (
	<Row className="s12 l12 m12">
		<Row>
			<Col l={3} m={3} s={6} className="offset-l5 offset-m5 offset-s2">
					<a href="#/login" className="waves-effect waves-light btn-large purple darken-3">
						   <i className="material-icons left">work</i> Let's Calculate Your Networh
					</a>
				</Col>
		</Row>
      <Row className="purple darken-2 center-aligned" >
		<Collection header='Why Net Worth is Important?' >
		  <CollectionItem className="purple darken-2 white-text" > Net worth is the most accurate measure of wealth. Wealth is what is left over after all of your bills are paid — and that’s precisely what net worth is all about. There’s no way to know exactly how wealthy you are without knowing what your net worth is.</CollectionItem>
		  <CollectionItem className="purple darken-2 white-text" >Tracking your financial progress. Since net worth is a specific number able to be tracked with precision, it enables you to measure your financial progress from one month or year to the next. A growing net worth is the best sign you’re moving forward; a decline in net worth means you have more work to do.</CollectionItem>
		  <CollectionItem className="purple darken-2 white-text" >Moving the financial focus beyond income alone. The concepts of wealth and prosperity are often grouped by income levels. While this measure has some value, it doesn’t take into account expenses, taxes, or other specifics. Even if your income is growing, if your net worth is flat or declining, your financial situation may not be improving at all.</CollectionItem>
		  <CollectionItem className="purple darken-2 white-text" >Avoids over-emphasis on asset value alone. Some people focus almost exclusively on the value of their assets as a measure of their personal wealth. For example, they may proudly proclaim $250,000 in assets, while ignoring $200,000 in debt. It is not the size of either number that counts, but rather the difference between the two.</CollectionItem>
		  <CollectionItem className="purple darken-2 white-text" >Puts your debt level in proper perspective. In a perfect world, we should all be debt free — but that’s not quite the way life works. A large debt number can seem scary, but if it is more than offset by a large asset position, it’s not nearly as bad as it looks. For example, if you have $50,000 in debt — and $250,000 in assets — your debt level probably isn’t extreme.</CollectionItem>
		  <CollectionItem className="purple darken-2 white-text" > Net worth can be important when applying for a loan. Since net worth is the best measure of overall financial strength, lenders are often interested in knowing what it is in determining whether or not they will approve you for a loan.</CollectionItem>
		</Collection>
	  </Row>
	</Row>
    );
  }
}

export default Intro;