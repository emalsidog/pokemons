// Dependencies
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// Styles
import styles from "./modal.module.css";

// Types
// interface ModalProps {
//   children: React.ReactNode;

//   isVisible: boolean;
//   title: string;
//   isStatic?: boolean;

//   onClose: () => void;
//   onOk: () => void;
// }

const Modal = (props) => {
	const {
		onOk,
		onClose,
		isVisible,

		title,
		isStatic = false,

		children,

		form = null,
	} = props;

	const ref = useRef(null);

	useEffect(() => {
		if (!isStatic) {
			const unsubscribe = eventListenters();
			return unsubscribe;
		}
	});

	const eventListenters = () => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscQuit);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscQuit);
		};
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			onClose();
		}
	};

	const handleEscQuit = (event) => {
		if (event.key === "Escape") {
			onClose();
		}
	};

	if (!isVisible) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className={styles.container}>
			<div className={styles.modal} ref={ref}>
				<div className={styles.modalHeader}>
					<span>{title}</span>
					<button onClick={onClose} className="btn-close">
						<i className="fas fa-times"></i>
					</button>
				</div>
				<div className={styles.modalContent}>{children}</div>
				<div className={styles.modalFooter}>
					<button className="btn btn-secondary" onClick={onClose}>
						Close
					</button>
					<button
						form={form}
						className="btn btn-primary"
						onClick={onOk}
					>
						Save
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
