import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ScrollView, ActivityIndicator, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import {
    getCocktailsList,
    getCocktailsData,
    getCocktailsDetailTransformed,
} from './selectors';
import { compose } from 'recompose';
import { fetchCocktails, filterCocktails } from './actions';
import _ from 'lodash';

//COMPONENTS
import {View, Text, Button, Image} from 'react-native-ui-lib';

const width = Dimensions.get('window').width;

class CocktailsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    static navigationOptions = {
        title: 'Random Drinks',
        headerStyle: {
            backgroundColor: '#2b93a7',
            textAlign: 'center'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
        },
    };

    componentDidMount() {
        this.props.fetchCocktails()
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4EBCD1' }}>
                    <View style={{marginTop: 10, backgroundColor: '#4EBCD1'}} >
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: width * .8}}
                            placeholder={'Search a Cocktail'}
                            onChangeText={(text) => this._changeFilterInput(text)}
                            value={this.state.text}
                        />
                    </View>
                    <View flex paddingV-50 centerH>
                        {(!_.isEmpty(this.props.dataListFiltered)) ?
                            this.props.dataListFiltered.map(id => {
                                return (
                                    <TouchableOpacity center key={id}
                                          onPress={() => navigate('Detail', {description: this.props.data[id].strDrink,
                                          details: this.props.data[id].details})}
                                          style={{width: width * .9, backgroundColor: '#ade0ea', margin: 10,
                                              display: 'flex', flexDirection: 'row'}}
                                    >
                                        <View style={{marginLeft: 8,  }}>
                                            <View style={{
                                                flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start',
                                                flexWrap: 'wrap',
                                                width: width * .4,
                                            }}>
                                                <Text style={{fontSize: 22, textAlign: 'center'}}>
                                                    {this.props.data[id].strDrink}
                                                </Text>
                                            </View>
                                            <View style={{flex: 3}}>
                                                {(this.props.data[id].details && !_.isEmpty(this.props.data[id].details.ingredients)) ?

                                                    this._showIngredients(this.props.data[id].details.ingredients) :
                                                    <ActivityIndicator size="large" color="#d1634e" />
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Image
                                                style={{width: 150, height: 180, margin: 10, borderRadius: 10}}
                                                source={{uri: this.props.data[id].strDrinkThumb}}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }) :
                            <View flex paddingV-210 centerH>
                                <ActivityIndicator size="large" color="#d1634e" />
                                <Text>waiting for the results ...</Text>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }

    _changeFilterInput = (text) => {
        this.setState({text});
        this.props.filterCocktails(text);
    };

    _showIngredients = (arrayIngredients) => {
        if (arrayIngredients.length > 2) {
            let otherIngredients = arrayIngredients.length - 2;
            return (
                <View style={{
                    flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    width: width * .4,
                }}>
                    <Text style={{fontSize: 16}} >
                        {'\u2022'}{arrayIngredients[0]}
                    </Text>
                    <Text style={{fontSize: 16}} >
                        {'\u2022'}{arrayIngredients[1]}
                    </Text>
                    <Text>
                        {(otherIngredients > 1) ?
                            `y ${otherIngredients} ingredientes más.` :
                            'y 1 ingrediente más.'
                        }
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{
                    flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    width: width * .4,
                }}>
                    {
                        arrayIngredients.map(ingr => {
                            return (
                                <Text style={{fontSize: 16}} key={ingr}>
                                    {'\u2022'}{ingr}
                                </Text>
                            )
                        })
                    }
                </View>
            )
        }
    }
}

CocktailsScreen.propTypes = {
    data: PropTypes.object,
    dataList: PropTypes.array,
    fetchSettings: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
       data: getCocktailsData(state),
       dataList: getCocktailsList(state),
        dataListFiltered: getCocktailsDetailTransformed(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        filterCocktails,
        fetchCocktails,
    }, dispatch)
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(CocktailsScreen);
