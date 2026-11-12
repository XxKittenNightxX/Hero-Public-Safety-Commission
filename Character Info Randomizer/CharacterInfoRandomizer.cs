using System;
using System.Drawing;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Windows.Forms;

internal static class CharacterInfoRandomizer
{
    [STAThread]
    private static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new RandomizerForm());
    }
}

internal sealed class RandomizerForm : Form
{
    private readonly ComboBox sexInput;
    private readonly NumericUpDown ageInput;
    private readonly TextBox firstNameInput;
    private readonly TextBox lastNameInput;
    private readonly TextBox quirkNameInput;
    private readonly TextBox quirkTypeInput;
    private readonly TextBox quirkDescriptionInput;
    private readonly Label idOutput;
    private readonly Label birthdateOutput;
    private readonly Label bloodTypeOutput;
    private readonly Label heightOutput;
    private readonly Button copyButton;
    private readonly Label status;

    internal RandomizerForm()
    {
        Text = "Character Info Randomizer";
        StartPosition = FormStartPosition.CenterScreen;
        ClientSize = new Size(520, 820);
        MinimumSize = new Size(480, 780);
        Font = new Font("Segoe UI", 10F);
        BackColor = Color.FromArgb(247, 248, 245);

        TableLayoutPanel layout = new TableLayoutPanel();
        layout.Dock = DockStyle.Fill;
        layout.Padding = new Padding(28, 20, 28, 20);
        layout.ColumnCount = 2;
        layout.RowCount = 18;
        layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 38F));
        layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 62F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 42F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 34F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 74F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 42F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 44F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 30F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 42F));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 26F));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
        Controls.Add(layout);

        Label heading = new Label();
        heading.Text = "Character Info Randomizer";
        heading.Font = new Font("Segoe UI", 17F, FontStyle.Bold);
        heading.ForeColor = Color.FromArgb(16, 42, 54);
        heading.Dock = DockStyle.Fill;
        heading.TextAlign = ContentAlignment.MiddleLeft;
        layout.Controls.Add(heading, 0, 0);
        layout.SetColumnSpan(heading, 2);

        Label subheading = new Label();
        subheading.Text = "Generate character details from sex and age.";
        subheading.ForeColor = Color.FromArgb(101, 119, 125);
        subheading.Dock = DockStyle.Fill;
        subheading.TextAlign = ContentAlignment.MiddleLeft;
        layout.Controls.Add(subheading, 0, 1);
        layout.SetColumnSpan(subheading, 2);

        lastNameInput = new TextBox();
        AddInputRow(layout, "Last name", lastNameInput, 2);

        firstNameInput = new TextBox();
        AddInputRow(layout, "First name", firstNameInput, 3);

        sexInput = new ComboBox();
        sexInput.DropDownStyle = ComboBoxStyle.DropDownList;
        sexInput.Items.AddRange(new object[] { "Female", "Male", "Other" });
        sexInput.SelectedIndex = 0;
        AddInputRow(layout, "Sex", sexInput, 4);

        ageInput = new NumericUpDown();
        ageInput.Minimum = 0;
        ageInput.Maximum = 120;
        ageInput.Value = 17;
        AddInputRow(layout, "Age", ageInput, 5);

        quirkNameInput = new TextBox();
        AddInputRow(layout, "Quirk name", quirkNameInput, 6);

        quirkTypeInput = new TextBox();
        AddInputRow(layout, "Quirk type", quirkTypeInput, 7);

        quirkDescriptionInput = new TextBox();
        quirkDescriptionInput.Multiline = true;
        quirkDescriptionInput.AcceptsReturn = true;
        quirkDescriptionInput.ScrollBars = ScrollBars.Vertical;
        AddInputRow(layout, "Quirk description", quirkDescriptionInput, 8);

        Button generateButton = new Button();
        generateButton.Text = "Generate details";
        generateButton.Height = 38;
        generateButton.Dock = DockStyle.Fill;
        generateButton.FlatStyle = FlatStyle.Flat;
        generateButton.FlatAppearance.BorderSize = 0;
        generateButton.BackColor = Color.FromArgb(8, 124, 120);
        generateButton.ForeColor = Color.White;
        generateButton.Font = new Font("Segoe UI", 10F, FontStyle.Bold);
        generateButton.Cursor = Cursors.Hand;
        generateButton.Click += delegate { GenerateDetails(); };
        layout.Controls.Add(generateButton, 0, 9);
        layout.SetColumnSpan(generateButton, 2);

        idOutput = AddOutputRow(layout, "Registry ID", 10);
        birthdateOutput = AddOutputRow(layout, "Birthdate (MM-DD)", 11);
        bloodTypeOutput = AddOutputRow(layout, "Blood type", 12);
        heightOutput = AddOutputRow(layout, "Height", 13);

        Label heightNote = new Label();
        heightNote.Text = "Height is a broad fictional estimate; individual characters may vary.";
        heightNote.ForeColor = Color.FromArgb(101, 119, 125);
        heightNote.Font = new Font("Segoe UI", 8.5F);
        heightNote.Dock = DockStyle.Bottom;
        heightNote.Height = 30;
        layout.Controls.Add(heightNote, 0, 14);
        layout.SetColumnSpan(heightNote, 2);

        copyButton = new Button();
        copyButton.Text = "Copy JSON fields";
        copyButton.Enabled = false;
        copyButton.Height = 36;
        copyButton.Dock = DockStyle.Bottom;
        copyButton.Click += delegate { CopyGeneratedFields(); };
        layout.Controls.Add(copyButton, 0, 15);
        layout.SetColumnSpan(copyButton, 2);

        status = new Label();
        status.Text = "";
        status.ForeColor = Color.FromArgb(8, 124, 120);
        status.Dock = DockStyle.Bottom;
        status.Height = 26;
        layout.Controls.Add(status, 0, 16);
        layout.SetColumnSpan(status, 2);

        sexInput.SelectedIndexChanged += delegate { InvalidateGeneratedDetails(); };
        ageInput.ValueChanged += delegate { InvalidateGeneratedDetails(); };
        GenerateDetails();
    }

    private static void AddInputRow(TableLayoutPanel layout, string text, Control input, int row)
    {
        Label label = new Label();
        label.Text = text;
        label.ForeColor = Color.FromArgb(23, 49, 60);
        label.Dock = DockStyle.Fill;
        label.TextAlign = ContentAlignment.MiddleLeft;
        input.Dock = DockStyle.Fill;
        input.Margin = new Padding(3, 10, 3, 10);
        layout.Controls.Add(label, 0, row);
        layout.Controls.Add(input, 1, row);
    }

    private Label AddOutputRow(TableLayoutPanel layout, string text, int row)
    {
        Label label = new Label();
        label.Text = text;
        label.ForeColor = Color.FromArgb(101, 119, 125);
        label.Dock = DockStyle.Fill;
        label.TextAlign = ContentAlignment.MiddleLeft;

        Label output = new Label();
        output.Text = "";
        output.ForeColor = Color.FromArgb(8, 124, 120);
        output.Font = new Font("Segoe UI", 11F, FontStyle.Bold);
        output.Dock = DockStyle.Fill;
        output.TextAlign = ContentAlignment.MiddleLeft;

        layout.Controls.Add(label, 0, row);
        layout.Controls.Add(output, 1, row);
        return output;
    }

    private void GenerateDetails()
    {
        int age = Decimal.ToInt32(ageInput.Value);
        idOutput.Text = "ID: " + RandomFourDigitNumber() + "-" + RandomFourDigitNumber() + "-" + RandomFourDigitNumber();
        birthdateOutput.Text = GenerateBirthdate(age);
        bloodTypeOutput.Text = new[] { "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" }[RandomNumber(0, 8)];

        int minimumHeight;
        int maximumHeight;
        GetHeightRange(sexInput.SelectedItem.ToString(), age, out minimumHeight, out maximumHeight);
        int inches = RandomNumber(minimumHeight, maximumHeight + 1);
        heightOutput.Text = String.Format(CultureInfo.InvariantCulture, "{0}' {1}\"", inches / 12, inches % 12);

        status.Text = "";
        copyButton.Enabled = true;
    }

    private void InvalidateGeneratedDetails()
    {
        copyButton.Enabled = false;
        status.Text = "Generate details again before copying.";
    }

    private static string GenerateBirthdate(int age)
    {
        DateTime today = DateTime.Today;
        DateTime latestBirthdate = today.AddYears(-age);
        DateTime earliestBirthdate = latestBirthdate.AddYears(-1).AddDays(1);
        int numberOfDays = (latestBirthdate - earliestBirthdate).Days + 1;
        DateTime birthdate = earliestBirthdate.AddDays(RandomNumber(0, numberOfDays));
        return birthdate.ToString("MM-dd", CultureInfo.InvariantCulture);
    }

    private static void GetHeightRange(string sex, int age, out int minimum, out int maximum)
    {
        if (age <= 2)
        {
            minimum = 20;
            maximum = 38;
        }
        else if (age <= 5)
        {
            minimum = 34;
            maximum = 45;
        }
        else if (age <= 9)
        {
            minimum = 42;
            maximum = 56;
        }
        else if (age <= 12)
        {
            minimum = 50;
            maximum = 64;
        }
        else if (age <= 15)
        {
            minimum = sex == "Male" ? 58 : 56;
            maximum = sex == "Female" ? 69 : 73;
        }
        else if (age <= 17)
        {
            minimum = sex == "Male" ? 62 : 59;
            maximum = sex == "Female" ? 72 : 77;
        }
        else
        {
            minimum = sex == "Male" ? 63 : 59;
            maximum = sex == "Female" ? 74 : 80;
        }
    }

    private static string RandomFourDigitNumber()
    {
        byte[] bytes = new byte[4];
        uint limit = UInt32.MaxValue - (UInt32.MaxValue % 9000U);
        using (RandomNumberGenerator random = RandomNumberGenerator.Create())
        {
            uint value;
            do
            {
                random.GetBytes(bytes);
                value = BitConverter.ToUInt32(bytes, 0);
            } while (value >= limit);

            return (1000U + (value % 9000U)).ToString(CultureInfo.InvariantCulture);
        }
    }

    private static int RandomNumber(int minimum, int maximumExclusive)
    {
        byte[] bytes = new byte[4];
        uint range = (uint)(maximumExclusive - minimum);
        uint limit = UInt32.MaxValue - (UInt32.MaxValue % range);
        using (RandomNumberGenerator random = RandomNumberGenerator.Create())
        {
            uint value;
            do
            {
                random.GetBytes(bytes);
                value = BitConverter.ToUInt32(bytes, 0);
            } while (value >= limit);

            return minimum + (int)(value % range);
        }
    }

    private void CopyGeneratedFields()
    {
        string lastName = lastNameInput.Text.Trim();
        string firstName = firstNameInput.Text.Trim();
        string legalName = lastName.Length == 0
            ? firstName
            : firstName.Length == 0
                ? lastName
                : lastName + ", " + firstName;
        string fields = BuildRegistryEntry(
            legalName,
            idOutput.Text,
            birthdateOutput.Text,
            bloodTypeOutput.Text,
            sexInput.SelectedItem.ToString(),
            heightOutput.Text,
            Decimal.ToInt32(ageInput.Value),
            quirkNameInput.Text,
            quirkTypeInput.Text,
            quirkDescriptionInput.Text);
        try
        {
            Clipboard.SetText(fields);
            status.Text = "JSON fields copied to clipboard.";
        }
        catch (Exception error)
        {
            MessageBox.Show(this, "Could not copy the JSON fields: " + error.Message,
                "Clipboard error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private static string BuildRegistryEntry(string legalName, string registryName, string birthdate,
        string bloodType, string sex, string height, int age, string quirkName, string quirkType,
        string quirkDescription)
    {
        string resolvedQuirkName = String.IsNullOrWhiteSpace(quirkName) ? "Quirkless" : quirkName.Trim();
        string resolvedQuirkType = String.IsNullOrWhiteSpace(quirkType) ? "N/A" : quirkType.Trim();
        string resolvedQuirkDescription = String.IsNullOrWhiteSpace(quirkDescription) ? "N/A" : quirkDescription.Trim();
        return "  { \"legalName\": \"" + EscapeJson(legalName) + "\",\r\n" +
            "    \"registryName\": \"" + EscapeJson(registryName) + "\",\r\n" +
            "    \"quirkName\": \"" + EscapeJson(resolvedQuirkName) + "\",\r\n" +
            "    \"quirkType\": \"" + EscapeJson(resolvedQuirkType) + "\",\r\n" +
            "    \"quirkDescription\": \"" + EscapeJson(resolvedQuirkDescription) + "\",\r\n" +
            "    \"Birthdate\": \"" + EscapeJson(birthdate) + "\",\r\n" +
            "    \"BloodType\": \"" + EscapeJson(bloodType) + "\",\r\n" +
            "    \"Sex\": \"" + EscapeJson(sex) + "\",\r\n" +
            "    \"Pronouns\": \"\",\r\n" +
            "    \"Height\": \"" + EscapeJson(height) + "\",\r\n" +
            "    \"Age\": \"" + age.ToString(CultureInfo.InvariantCulture) + "\",\r\n" +
            "    \"Role\": \"\",\r\n" +
            "    \"Family\": {\r\n" +
            "      \"Father\": \"\",\r\n" +
            "      \"Mother\": \"\",\r\n" +
            "      \"Spouse\": \"\",\r\n" +
            "      \"Siblings\": [\"\"],\r\n" +
            "      \"Children\": [\"\"]\r\n" +
            "    },\r\n" +
            "    \"Notes\": {\r\n" +
            "      \"1\": \"\",\r\n" +
            "      \"2\": \"\",\r\n" +
            "      \"3\": \"\",\r\n" +
            "      \"4\": \"\",\r\n" +
            "      \"5\": \"\"\r\n" +
            "    },\r\n" +
            "    \"Background\": \"\"\r\n" +
            "  }";
    }

    private static string EscapeJson(string value)
    {
        StringBuilder escaped = new StringBuilder();
        foreach (char character in value)
        {
            if (character == '\\' || character == '"')
            {
                escaped.Append('\\');
            }
            if (character == '\r')
            {
                escaped.Append("\\r");
            }
            else if (character == '\n')
            {
                escaped.Append("\\n");
            }
            else
            {
                escaped.Append(character);
            }
        }
        return escaped.ToString();
    }
}
