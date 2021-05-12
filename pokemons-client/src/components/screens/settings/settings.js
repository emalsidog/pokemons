// Dependencies
import React from "react";
import { useSelector } from "react-redux";

// Selectors
import {
	selectUser,
	selectIsLoading,
} from "../../../redux/selectors/user-selectors";

import { selectTeamPokemons } from "../../../redux/selectors/pokemons-selectors";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";

import UpdateEmailForm from "./settings-components/update-email-form";
import UpdateUsernameForm from "./settings-components/update-username-form";
import UpdatePhoneForm from "./settings-components/update-phone-form";
import UpdateNameForm from "./settings-components/update-name-form";
import UpdateWarParticipant from "./settings-components/update-war-participant";

// Styles
import "./settings.css";

const Settings = () => {
	// Redux
	const user = useSelector(selectUser);
	const isLoading = useSelector(selectIsLoading);
	const teamPokemons = useSelector(selectTeamPokemons);

	return (
		<Layout>
			<Heading
				title="Settings"
				description="Here you are able to change your personal information."
			/>

			<UpdateEmailForm email={user.email} isLoading={isLoading} />

			<UpdateUsernameForm
				username={user.username}
				isLoading={isLoading}
			/>

			<UpdatePhoneForm phone={user.phone} isLoading={isLoading} />

			<UpdateNameForm
				givenName={user.givenName}
				familyName={user.familyName}
				isLoading={isLoading}
			/>

			<UpdateWarParticipant
				teamPokemons={teamPokemons}
				warParticipant={user.warParticipant}
				isLoading={isLoading}
			/>
		</Layout>
	);
};

export default Settings;
