package pe.edu.upc.demosm2.dtos;

import java.time.LocalDate;

public class MovieDTO {
    private Long idMovie;
    private String titleMovie;
    private String synopsisMovie;
    private LocalDate releaseDateMovie;
    private int durationMovie;
    private double inversionMovie;
    private double averageRatingMovie;
    private Long idStreaming;

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

    public Long getIdStreaming() {
        return idStreaming;
    }

    public void setIdStreaming(Long idStreaming) {
        this.idStreaming = idStreaming;
    }
}
