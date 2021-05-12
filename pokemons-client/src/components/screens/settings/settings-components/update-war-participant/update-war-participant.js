// Dependencies
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { updateWarParticipantRequest } from "../../../../../redux/actions/user-update-actions";

const UpdateWarParticipant = (props) => {
    const { teamPokemons, warParticipant, isLoading } = props;

    const dispatch = useDispatch();

	const handleWarParticipantChange = () => {
		dispatch(updateWarParticipantRequest());
	};

	return (
		<div className="settings-row">
			<div>Participate in the war?</div>
			<div>
				<input
					onChange={handleWarParticipantChange}
					type="checkbox"
					disabled={teamPokemons.length < 5 || isLoading}
					defaultChecked={warParticipant}
				/>
			</div>
		</div>
	);
};

export default UpdateWarParticipant;
