import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user-actions';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: [],
		};
	}
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	submitForm = (event) => {
		event.preventDefault();
		let dataToSubmit = {
			email: this.state.email,
			password: this.state.password,
		};
		if (this.isFormValid(this.state)) {
			this.setState({ errors: [] });
			this.props
				.dispatch(loginUser(dataToSubmit))
				.then((res) => {
					console.log(res);
					if (res.payload.loginSuccess) {
						this.props.history.push('/');
					} else {
						this.setState({
							errors: this.state.errors.concat(
								'failed to login, check email and password'
							),
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	isFormValid = ({ email, password }) => {
		if (email && password) {
			if (email.includes('@')) {
				return true;
			} else {
				this.setState({ errors: ['not valid email'] });
				return false;
			}
		} else {
			this.setState({
				errors: ['Not valid email and password'],
			});
			return false;
		}
	};
	displayErrors = (errors) => {
		return (
			<div className='row'>
				{errors.map((error, idx) => (
					<div key={idx} className='col s12 red-text text-darken-2'>
						{error}
					</div>
				))}
			</div>
		);
	};
	render() {
		return (
			<div className='container'>
				<h1>Login</h1>
				<div className='row'>
					<form
						className='col s12'
						onSubmit={(event) => this.submitForm(event)}
					>
						<div className='row'>
							<div className='input-field col s12'>
								<input
									name='email'
									id='email'
									className='validate '
									type='email'
									value={this.state.email}
									onChange={(event) => this.handleChange(event)}
								/>
								<label htmlFor='email'>Email</label>
								<span
									className='helper-text'
									data-error='Type a right type email'
									data-success='Right email'
								></span>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input
									name='password'
									id='password'
									className='validate autocomplete'
									type='password'
									value={this.state.password}
									onChange={(event) => this.handleChange(event)}
								/>
								<label htmlFor='password'>Password</label>
								<span
									className='helper-text'
									data-error='Type a right type password'
									data-success='Right password type'
								></span>
							</div>
						</div>
						{this.state.errors.length > 0 &&
							this.displayErrors(this.state.errors)}
						<div className='row'>
							<div className='col s12'>
								<button
									className='btn waves-effect teal hoverable lighten-2'
									type='submit'
									onClick={this.submitForm}
								>
									Login
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.user,
	};
}
export default connect(mapStateToProps)(Login);
