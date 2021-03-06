import React, { Component } from 'react';
import MovieLayout from '../components/movie';
import Player from '../../player/containers/player';
import Header from '../../sections/components/header';
import Close from '../../sections/components/close';
import { connect } from 'react-redux';
import Detaeils from '../../videos/components/details';
// Animaciones 
import { Animated } from 'react-native';

class Movie extends Component {

    state = {
        opacity: new Animated.Value(0),
    }
    
    closeVideo = () => {
        this.props.dispatch({
            type: 'SET_SELECTED_MOVIE',
            payload: {
                movie: null,
            }
        })
    }

    componentDidMount(){
        // recibe dos valores uno es el valor a cambiar y el otro es el tiempo en que va a 
        // ocurrir 
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 1000
            }
        ).start();
    }
    
    render() {
        return (
            <Animated.View style = {{
                flex: 1,
                opacity: this.state.opacity,
            }}>
                <MovieLayout >

                    <Header >
                        <Close onPress = { this.closeVideo } />
                    </Header>

                    <Player />

                    <Detaeils {...this.props.movie }  />

                </MovieLayout>
            </Animated.View>
        );
    }
}
const mapStateToProps = (state) => ({
    movie: state.selectedMovie
});

export default connect( mapStateToProps )(Movie);