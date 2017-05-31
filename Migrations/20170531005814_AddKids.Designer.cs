using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using CampBank.Persistence;

namespace CampBank.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20170531005814_AddKids")]
    partial class AddKids
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CampBank.Model.Cabin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Cabins");
                });

            modelBuilder.Entity("CampBank.Model.Kid", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("Balance");

                    b.Property<int>("CabinId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CabinId");

                    b.ToTable("Kid");
                });

            modelBuilder.Entity("CampBank.Model.Kid", b =>
                {
                    b.HasOne("CampBank.Model.Cabin", "Cabin")
                        .WithMany("Kids")
                        .HasForeignKey("CabinId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
