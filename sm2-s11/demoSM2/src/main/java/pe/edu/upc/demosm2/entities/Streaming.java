package pe.edu.upc.demosm2.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
//ORM
@Entity
@Table(name = "Streamings")
public class Streaming {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idStreaming;

    @Column(name = "nameStreaming",length = 30,nullable = false)
    private String nameStreaming;

    @Column(name = "descriptionStreaming",length = 150,nullable = false)
    private String descriptionStreaming;

    @Column(name = "urlStreaming",length = 100,nullable = false)
    private String urlStreaming;

    @Column(name = "launchDateStreaming",nullable = false)
    private LocalDate launchDateStreaming;

    @Column(name = "priceStreaming",nullable = false)
    private double priceStreaming;

    @Column(name = "statusStreaming",nullable = false)
    private boolean statusStreaming;

    public Streaming(Long idStreaming, String nameStreaming, String descriptionStreaming, String urlStreaming, LocalDate launchDateStreaming, double priceStreaming, boolean statusStreaming) {
        this.idStreaming = idStreaming;
        this.nameStreaming = nameStreaming;
        this.descriptionStreaming = descriptionStreaming;
        this.urlStreaming = urlStreaming;
        this.launchDateStreaming = launchDateStreaming;
        this.priceStreaming = priceStreaming;
        this.statusStreaming = statusStreaming;
    }

    public Streaming() {
    }

    public Long getIdStreaming() {
        return idStreaming;
    }

    public void setIdStreaming(Long idStreaming) {
        this.idStreaming = idStreaming;
    }

    public String getNameStreaming() {
        return nameStreaming;
    }

    public void setNameStreaming(String nameStreaming) {
        this.nameStreaming = nameStreaming;
    }

    public String getDescriptionStreaming() {
        return descriptionStreaming;
    }

    public void setDescriptionStreaming(String descriptionStreaming) {
        this.descriptionStreaming = descriptionStreaming;
    }

    public String getUrlStreaming() {
        return urlStreaming;
    }

    public void setUrlStreaming(String urlStreaming) {
        this.urlStreaming = urlStreaming;
    }

    public LocalDate getLaunchDateStreaming() {
        return launchDateStreaming;
    }

    public void setLaunchDateStreaming(LocalDate launchDateStreaming) {
        this.launchDateStreaming = launchDateStreaming;
    }

    public double getPriceStreaming() {
        return priceStreaming;
    }

    public void setPriceStreaming(double priceStreaming) {
        this.priceStreaming = priceStreaming;
    }

    public boolean isStatusStreaming() {
        return statusStreaming;
    }

    public void setStatusStreaming(boolean statusStreaming) {
        this.statusStreaming = statusStreaming;
    }
}
