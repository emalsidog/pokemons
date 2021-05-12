// Dependencies
<<<<<<< Updated upstream
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// Actions
import * as updateActions from "../../../redux/actions/user-update-actions";
=======
import React from "react";
import { useSelector } from "react-redux";
>>>>>>> Stashed changes

// Selectors
import {
	selectUser,
	selectIsLoading,
} from "../../../redux/selectors/user-selectors";
import { selectTeamPokemons } from "../../../redux/selectors/pokemons-selectors";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
<<<<<<< Updated upstream
=======

import UpdateEmailForm from "./settings-components/update-email-form";
import UpdateUsernameForm from "./settings-components/update-username-form";
import UpdatePhoneForm from "./settings-components/update-phone-form";
import UpdateNameForm from "./settings-components/update-name-form";
import UpdateWarParticipant from "./settings-components/update-war-participant";
>>>>>>> Stashed changes

// Styles
import "./settings.css";

const Settings = () => {
	// Redux
	const user = useSelector(selectUser);
	const isLoading = useSelector(selectIsLoading);
	const teamPokemons = useSelector(selectTeamPokemons);

<<<<<<< Updated upstream
	const {
		register: changeEmailRegister,
		formState: { errors: changeEmailErrors },
		handleSubmit: changeEmailHandleSubmit,
	} = useForm();

	const {
		register: changeUsernameRegister,
		formState: { errors: changeUsernameErrors },
		handleSubmit: changeUsernameHandleSubmit,
	} = useForm();

	const {
		register: changePhoneRegister,
		formState: { errors: changePhoneErrors },
		handleSubmit: changePhoneHandleSubmit,
	} = useForm();

	const {
		register: changeNameRegister,
		formState: { errors: changeNameErrors },
		handleSubmit: changeNameHandleSubmit,
	} = useForm();

	const changeEmailOnSubmit = (data) => {
		dispatch(updateActions.updateEmail(data));
		setShowChangeEmailForm(false);
	};

	const changeUsernameOnSubmit = (data) => {
		dispatch(updateActions.updateUsername(data));
		setShowChangeUsernameForm(false);
	};

	const changePhoneOnSubmit = (data) => {
		dispatch(updateActions.updatePhone(data));
		setShowChangePhoneForm(false);
	};

	const changeNameOnSubmit = (data) => {
		dispatch(updateActions.updateName(data));
		setShowChangeNameForm(false);
	};

	const handleShowChangeNameForm = () => {
		setShowChangeNameForm(!showChangeNameForm);
	};

	const handleShowChangeEmailForm = () => {
		setShowChangeEmailForm(!showChangeEmailForm);
	};

	const handleShowChangeUsernameForm = () => {
		setShowChangeUsernameForm(!showChangeUsernameForm);
	};

	const handleShowChangePhoneForm = () => {
		setShowChangePhoneForm(!showChangePhoneForm);
	};

	const handleWarParticipantChange = () => {
		dispatch(updateActions.updateWarParticipant());
	};


=======
>>>>>>> Stashed changes
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
