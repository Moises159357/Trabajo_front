package pe.edu.upc.demosm2.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMovie;
    @Column(name = "titleMovie",length = 30,nullable = false)
    private String titleMovie;
    @Column(name = "synopsisMovie",length = 200,nullable = false)
    private String synopsisMovie;
    @Column(name = "releaseDateMovie",nullable = false)
    private LocalDate releaseDateMovie;
    @Column(name = "durationMovie",nullable = false)
    private int durationMovie;
    @Column(name = "inversionMovie",nullable = false)
    private double inversionMovie;
    @Column(name = "averageRatingMovie",nullable = false)
    private double averageRatingMovie;
    @ManyToOne
    @JoinColumn(name = "idStreaming",nullable = false)
    private Streaming streaming;

    public Movie() {
    }

    public Movie(Long idMovie, String titleMovie, String synopsisMovie, LocalDate releaseDateMovie, int durationMovie, double inversionMovie, double averageRatingMovie, Streaming streaming) {
        this.idMovie = idMovie;
        this.titleMovie = titleMovie;
        this.synopsisMovie = synopsisMovie;
        this.releaseDateMovie = releaseDateMovie;
        this.durationMovie = durationMovie;
        this.inversionMovie = inversionMovie;
        this.averageRatingMovie = averageRatingMovie;
        this.streaming = streaming;
    }

    public Long getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(Long idMovie) {
        this.idMovie = idMovie;
    }

    public String getTitleMovie() {
        return titleMovie;
    }

    public void setTitleMovie(String titleMovie) {
        this.titleMovie = titleMovie;
    }

    public String getSynopsisMovie() {
        return synopsisMovie;
    }

    public void setSynopsisMovie(String synopsisMovie) {
        this.synopsisMovie = synopsisMovie;
    }

    public LocalDate getReleaseDateMovie() {
        return releaseDateMovie;
    }

    public void setReleaseDateMovie(LocalDate releaseDateMovie) {
        this.releaseDateMovie = releaseDateMovie;
    }

    public int getDurationMovie() {
        return durationMovie;
    }

    public void setDurationMovie(int durationMovie) {
        this.durationMovie = durationMovie;
    }

    public double getInversionMovie() {
        return inversionMovie;
    }

    public void setInversionMovie(double inversionMovie) {
        this.inversionMovie = inversionMovie;
    }

    public double getAverageRatingMovie() {
        return averageRatingMovie;
    }

    public void setAverageRatingMovie(double averageRatingMovie) {
        this.averageRatingMovie = averageRatingMovie;
    }

    public Streaming getStreaming() {
        return streaming;
    }

    public void setStreaming(Streaming streaming) {
        this.streaming = streaming;
    }
}
