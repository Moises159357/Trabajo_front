package pe.edu.upc.demosm2.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public class StreamingDTO {
    private Long idStreaming;
    @NotBlank(message = "El nombre del streaming es obligatorio")
    private String nameStreaming;
    @NotBlank(message = "La descripción del streaming es obligatoria")
    private String descriptionStreaming;
    @NotBlank(message = "La URL del streaming es obligatoria")
    private String urlStreaming;
    @NotNull(message = "La fecha de lanzamiento del streaming es obligatoria")
    private LocalDate launchDateStreaming;
    @Positive(message = "El precio del streaming debe ser un valor positivo")
    private double priceStreaming;
    @NotNull(message = "El estado del streaming es obligatorio")
    private boolean statusStreaming;

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
