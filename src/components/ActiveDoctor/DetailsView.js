/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AvailbleIcon from '../../assets/Available.svg'
import UnavailbleIcon from '../../assets/Unavailable.svg'
import LocationIcon from '../../assets/Location.svg'
import OfficePhone from '../../assets/office-telephone.svg'

export const DetailsView = (props) => {
	const {
		showingAllInsurances,
		updateShowingAll,
		isMobileView,
		activeDoctor: {
			practices, specialties, insurances, profile: {
				image_url, last_name, first_name, bio, title
			}
		}
	} = props
	const doctorSpecialties = []
	specialties.map(specialty => (
		doctorSpecialties.push(specialty.actor)
	))

	const renderPractices = () => (
		practices.map((practice) => {
			const {
				visit_address: {
					street, street2, city, state_long
				}
			} = practice
			return (
				<Card key={practice.uid}>
					<p>{practice.name}</p>
					{practice.distance && <SubText>{`${practice.distance.toFixed(2)} miles away`}</SubText>}
					<p><InfoIcon src={LocationIcon} />Address: {street}, {street2 && `${street2},`} {`${city}, ${state_long}.`}</p>
					{practice.phones.map((phone, index) => (phone.type === 'landline' && (
						<p key={index}><InfoIcon src={OfficePhone} />{phone.number}</p>)))}
					{practice.accepts_new_patients ? <p><InfoIcon src={AvailbleIcon} />Currently accepting new patients</p> : <p><InfoIcon src={UnavailbleIcon} /> Not currently accepting new patients</p>}
				</Card>
			)
		})
	)

	const renderInsurances = () => {
		if (!insurances.length) {
			return (
				<NoDataText>No insurance information available</NoDataText>
			)
		}
		let displayedInsurances;
		showingAllInsurances ? displayedInsurances = insurances : displayedInsurances = insurances.slice(0, 6)
		return (
			displayedInsurances.map((insurance, index) => (
				<CardSm
					key={index}
					isMobileView={isMobileView}
				>{insurance.insurance_plan.name}
				</CardSm>
			))
		)
	}
	return (
		<Container isMobileView={isMobileView}>
			<Profile>
				<Avatar src={image_url} />
				<Title>{first_name} {last_name}, {title}</Title>
				<HelperText>
					{doctorSpecialties.join(', ')}
				</HelperText>
				<div>{bio}</div>
			</Profile>
			<div>
				<Title>Practices</Title>
				<CardList>{renderPractices()}</CardList>
			</div>
			<div>
				<Title>Insurances</Title>

				<CardList>{renderInsurances()}</CardList>
			</div>
			{(insurances.length > 6) && (
				<div onClick={() => updateShowingAll()}>
					{showingAllInsurances ? 'Show Less' : `Show ${insurances.length - 6} More` }
				</div>
			)}
		</Container>
	)
}
DetailsView.propTypes = {
	activeDoctor: PropTypes.object,
	showingAllInsurances: PropTypes.bool.isRequired,
	updateShowingAll: PropTypes.func.isRequired,
	isMobileView: PropTypes.bool.isRequired
}
export default DetailsView

const Container = styled.div`
	background-color: #FFF;
	margin: 20px auto;
	width: auto;
	max-width: 678px;
	padding: 15px;
`

const Avatar = styled.div`
	background: ${({ src }) => `url(${src})`};
	width: 150px;
  height: 150px;
	background-repeat: no-repeat;
	background-size: cover;
	background-size: auto;
	margin: auto;
  background-position: center;
`
const Title = styled.div`
	font-variant: petite-caps;
  font-weight: bold;
	font-size: 22px;
`
const HelperText = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #C4C4C4;
	font-size: 13px;
	margin-bottom: 15px;
`
const Profile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;
	> :nth-child(4){
		text-align: center;
		font-size: 13px;
	}
`
const Card = styled.div`
	width: 318px;
	box-shadow: 0px 6px 20px #DAECEC;
	border-radius: 5px;
	margin: 12px 0;
	font-size: 12px;
	box-sizing: border-box;
	padding: 10px 15px 10px 15px;

	> p {
		margin-top: 0;
		margin-bottom: 3px;
	}

	> :first-child {
		font-family: Avenir;
		font-size: 16px;
		font-weight: 600;
	}

	> :not(:first-child) {
		font-family: 'Montserrat', sans-serif;
		font-size: 12px;
	}
`
const CardList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 40px;
	max-height: 270px;
	overflow: scroll;
	margin-top: 15px;
`
const CardSm = styled.div`
	width: ${({ isMobileView }) => (isMobileView ? '100%' : '45%')};
	box-shadow: 0px 0px 5px #DAECEC;
	height: 32px;
	font-size: 14px;
	white-space: nowrap;
	overflow-x: scroll;
	border: 1px solid rgba(0,0,0,0.1);
	display: flex;
  align-items: center;
	padding-left: 30px;
`
const InfoIcon = styled.span`
	background: ${({ src }) => `url(${src})`};
	width: 11px;
	height: 13px;
	background-size: contain;
	display: -webkit-inline-box;
	margin-right: 10px;
	background-repeat: no-repeat;
`
const SubText = styled.div`
	color: #909090;
	font-size: 12px;
`
const NoDataText = styled.div`
	font-size: 30px;
	color: #CCEFED;
`
