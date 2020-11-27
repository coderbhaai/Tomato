import React, { Component } from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer"
import moment from "moment"

const styles = StyleSheet.create({
    page: {
      backgroundColor: "#ffffff"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    movieContainer: {
      backgroundColor: "#f6f6f5",
      display: "flex",
      flexDirection: "row",
      padding: 5
    },
    movieDetails: {
      display: "flex",
      marginLeft: 5
    },
    movieTitle: {
      fontSize: 15,
      marginBottom: 10
    },
    movieOverview: {
      fontSize: 10
    },  
    image: {
      height: 60,
      width: 'auto',
      marginVertical: 15,
        marginHorizontal: 500,
    },
    subtitle: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      width: 150,
      alignItems: "center",
      marginBottom: 12
    },
    vote: {
      display: "flex",
      flexDirection: "row"
    },
    rating: {
      height: 10,
      width: 10
    },
    vote_text: {
      fontSize: 10
    },
    vote_pop: {
      fontSize: 10,
      padding: 2,
      backgroundColor: "#61C74F",
      color: "#fff"
    },
    vote_pop_text: {
      fontSize: 10,
      marginLeft: 4
    },
    overviewContainer: {
      minHeight: 110
    },
    detailsFooter: {
      display: "flex",
      flexDirection: "row"
    },
    lang: {
      fontSize: 8,
      fontWeight: 700
    },
    vote_average: {
      fontSize: 8,
      marginLeft: 4,
      fontWeight: "bold"
    }
});

export class Invoice extends Component {
    render() {
        console.log("pdf props", this.props.data);
        return (
            <Document>
                <Page style={styles.page}>
                    {this.props.data ? 
                            <View style={styles.movieContainer}>
                                {/* <img src={"/images/logo.webp"}/> */}
                                <Image
                                    style={styles.image}
                                    source={
                                        "/images/logo.png"
                                    // a.poster_path !== null
                                    //     ? `${POSTER_PATH}${a.poster_path}`
                                    //     : "150.jpg"
                                    }
                                />
                                {/* <View style={styles.movieDetails}>
                                    <Text style={styles.movieTitle}>{a.title}</Text>
                                    <View style={styles.subtitle}>
                                    <View style={styles.vote}>
                                        <Image source="star.png" style={styles.rating} />
                                        <Text style={styles.vote_text}>{a.vote_count}</Text>
                                    </View>
                                    <View style={styles.vote}>
                                        <Text style={styles.vote_pop}>{a.popularity}</Text>
                                        <Text style={styles.vote_pop_text}>Popularity</Text>
                                    </View>
                                    </View>
                                    <View style={styles.overviewContainer}>
                                    <Text style={styles.movieOverview}>{a.overview}</Text>
                                    </View>
                                    <View style={styles.detailsFooter}>
                                    <Text style={styles.lang}>
                                        Language: {a.original_language.toUpperCase()}
                                    </Text>
                                    <Text style={styles.vote_average}>
                                        Average Votes: {a.vote_average}
                                    </Text>
                                    <Text style={styles.vote_average}>
                                        Release Date:{" "}
                                        {moment(a.release_date, "YYYY-MM-DD").format(
                                        " MMMM D Y"
                                        )}
                                    </Text>
                                    </View>
                                </View> */}
                            </View>
                    : null}
                </Page>
            </Document>
                    
        )
    }
}

export default Invoice
