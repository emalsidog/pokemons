// Dependencies
import React from "react";

// Components
import Layout from "../../layout";

const Home = () => {
	return (
		<Layout>
			<h1>
				Let's battle
			</h1>
			<button>Battle!</button>

			<div>
				instead of lets battle and button
				<div>
					<span>The winner is: </span>
					<h2>User1</h2>
				</div>
			</div>

			<h3>Results</h3>

			<div>
				<span>User1 VS User2</span>
			</div>

			<div>
				<span>User1 pokemon team | User2 pokemon team</span>
			</div>

			<div>
				<span>User1 pokemon team TOTAL | User2 pokemon team TOTAL</span>
			</div>
			
		</Layout>
	);
};

export default Home;
