import { AppContext } from '../Contexts/AppContext';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FormCheck, Row, FormLabel } from 'react-bootstrap';
import * as yup from 'yup';

import Section from '../Components/Section';

import FormControl from '../Components/FormControl';

export const psPassthroughScheme = {
	PSPassthroughAddonEnabled: yup
		.number()
		.required()
		.label('PS Passthrough Add-On Enabled'),
	psPassthroughPinDplus: yup
		.number()
		.label('PS Passthrough D+ Pin')
		.validatePinWhenValue('PSPassthroughAddonEnabled'),
	psPassthroughPin5V: yup
		.number()
		.label('PS Passthrough 5V Power Pin')
		.validatePinWhenValue('PSPassthroughAddonEnabled'),
};

export const psPassthroughState = {
	PSPassthroughAddonEnabled: -1,
	psPassthroughPinDplus: 0,
	psPassthroughPin5V: -1,
};

const PSPassthrough = ({ values, errors, handleChange, handleCheckbox }) => {
	const { t } = useTranslation();
    const { getAvailablePeripherals } = useContext(AppContext);
	return (
		<Section title={t('AddonsConfig:pspassthrough-header-text')}>
			<div
				id="PSPassthroughAddonOptions"
				hidden={!values.PSPassthroughAddonEnabled}
			>
			</div>
            {getAvailablePeripherals('usb') ?
			<FormCheck
				label={t('Common:switch-enabled')}
				type="switch"
				id="PSPassthroughAddonButton"
				reverse
				isInvalid={false}
				checked={Boolean(values.PSPassthroughAddonEnabled)}
				onChange={(e) => {
					handleCheckbox('PSPassthroughAddonEnabled', values);
					handleChange(e);
				}}
			/>
            :
            <FormLabel>{t('PeripheralMapping:peripheral-toggle-unavailable',{'name':'USB'})}</FormLabel>
            }
		</Section>
	);
};

export default PSPassthrough;
