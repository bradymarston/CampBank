using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using CampBank.Persistence;

namespace CampBank.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20170531193814_UpdateKidsTableName")]
    partial class UpdateKidsTableName
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CampBank.Core.Model.Cabin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Cabins");
                });

            modelBuilder.Entity("CampBank.Core.Model.Kid", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("Balance");

                    b.Property<int>("CabinId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CabinId");

                    b.ToTable("Kids");
                });

            modelBuilder.Entity("CampBank.Core.Model.Kid", b =>
                {
                    b.HasOne("CampBank.Core.Model.Cabin", "Cabin")
                        .WithMany("Kids")
                        .HasForeignKey("CabinId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
